/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { CategoryStore, StripeStore, UserStore } from '../stores/index.js'

/*** Validation ***/
import { userValidate } from '../validations/index.js'

/*** Middleware ***/
import { createAuthToken } from '../middlewares/index.js'
import { uploadFileToStorage } from '../global/fileUploadMulter.js'
import constant from '../global/constant.js'
import { validatePassword } from '../models/user.model.js'

class UserController {
  getAll = async (req, res) => {
    try {
      const { query, projection, sort } = req.query
      let whatToSearch = { role: { $ne: constant.SUPERADMIN } };

      if (query && JSON.parse(query)?.role) {
        whatToSearch = {
          ...JSON.parse(query),
        }
      } else {
        if (query) {
          whatToSearch = {
            ...JSON.parse(query),
            ...whatToSearch
          }
        }
      }

      const users = await UserStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, users)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  login = async (req, res) => {
    try {
      const { email, password, clientId, loginWith } = req.body

      const query = {
        email,
        password,
        clientId,
        loginWith,
      }

      await userValidate.login(query)

      let whatToFind = {
        email,
      }

      // if (role == constant.EMPLOYEE) {
      //   whatToFind.clientId = clientId
      // }

      let user = await UserStore.get(whatToFind);

      if (!user) utils.throwError(404, constant.ERROR, `User not found in with ${email} and ${clientId}`)()

      // if (user.role !== role) utils.throwError(404, constant.ERROR, `User found but Role is not matched!`)()

      // check password match or not
      const iMatchPassword = await validatePassword(
        password,
        user.password
      )

      if (!iMatchPassword) {
        utils.throwError(404, constant.ERROR, `Password not match!`)()
      }

      const token = await createAuthToken(user)

      let activePlan = {};

      if (user?.stripeCustomerId) {
        let subscriptions = await StripeStore.getAllSubscriptionsOfCustomer(user.stripeCustomerId);
        subscriptions = await utils.modifySubscriptionRespons(subscriptions);

        activePlan = (subscriptions || [])?.find((subscription) => subscription.status === constant.STATUS.ACTIVE) || {};
      }

      user = {
        user,
        activePlan,
        token
      }

      utils.sendSuccess(res, 200, user)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  loginWithMobile = async (req, res) => {
    try {
      const { mobile, smsCode } = req.body

      const query = {
        mobile
      }

      if (!mobile) utils.throwError(404, constant.ERROR, 'Mobile number is Required!')()

      if (mobile && smsCode) {
        query.smsCode = smsCode
      }


      let user = await UserStore.get(query)
      if (!user) utils.throwError(404, constant.ERROR, `User not found in with ${mobile} number or Otp!`)()

      if (mobile && !smsCode) {
        // const sendSms = await utils.sendMobileSms(user) TODO { it's require purchase messages }
        await UserStore.updateByWhere(query, { smsCode: 'ANTHU@£' })

        const token = await createAuthToken(user)

        user = {
          user,
          token
        }
      }

      utils.sendSuccess(res, 200, user)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.userId
      }

      const user = await UserStore.get(query)
      utils.sendSuccess(res, 200, user)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      /*** Upload File With Multer ***/
      await uploadFileToStorage(req, res)

      const objectToCreate = {
        ...req.body,
        ...req.files,
      }

      await userValidate.create(objectToCreate)

      if (objectToCreate.role === constant.ADMIN) {
        objectToCreate.clientId = constant.INIT_CLIENTID;

        const whatToFind = { role: constant.ADMIN, clientId: { $exists: true } };
        const sortBy = { _id: -1 };

        const lastCreatedRestaurent = await UserStore.getWithSort(whatToFind, sortBy);

        console.log(lastCreatedRestaurent);

        if (lastCreatedRestaurent) {
          const newClientId = parseInt(lastCreatedRestaurent.clientId) + 1;

          console.log(newClientId);

          if (!newClientId) {
            utils.throwError(500, '', 'Error while generating clientId')()
          }

          objectToCreate.clientId = newClientId;
        }
      }

      let user = await UserStore.create(objectToCreate)

      if (user) {
        const categoryDetails = await CategoryStore.create({ category: 'Manager', clientId: user.clientId });
        if (categoryDetails) {
          await UserStore.update(user._id, { category: categoryDetails.category, workRole: categoryDetails._id})
          user.category = categoryDetails.category;
        }
      }

      utils.sendSuccess(res, 200, user)
    } catch (exception) {

      /*** When Get Error From Validate Body Data Then Uploaded File Should Be Delete ***/
      const files = req.files && (req.files.allImages || req.files.profileImage || [])

      if (files && files.length > 0) {
        files.forEach(file => {
          utils.removeFile(file)
        })
      }

      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      /*** Upload File With Multer ***/
      await uploadFileToStorage(req, res)

      const { userId } = req.params

      const whatToUpdate = {
        ...req.body,
        ...req.files
      }

      await userValidate.update(whatToUpdate, userId)

      await UserStore.update(userId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'User Updated Successfully!' })
    } catch (exception) {

      /*** When Get Error From Validate Body Data Then Uploaded File Should Be Delete ***/
      const files = req.files && (req.files.allImages || req.files.profileImage || [])

      if (files && files.length > 0) {
        files.forEach(file => {
          utils.removeFile(file)
        })
      }

      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { userId } = req.params

      await UserStore.delete(userId)

      utils.sendSuccess(res, 200, { message: 'User Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new UserController()