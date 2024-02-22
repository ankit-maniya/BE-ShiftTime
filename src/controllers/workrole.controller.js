/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { WorkroleStore } from '../stores/index.js'

/*** Validation ***/
// import { WorkroleValidate } from '../validations/index.js'

class WorkroleController {
  getAll = async (req, res) => {
    try {
      const { query, projection, sort } = req.query
      let whatToSearch = { isDelete: false };

      if (query) {
        whatToSearch = {
          ...JSON.parse(query),
          ...whatToSearch
        }
      }

      const Workroles = await WorkroleStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, Workroles)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.workroleId
      }

      console.log(query);

      const Workrole = await WorkroleStore.get(query)
      utils.sendSuccess(res, 200, Workrole)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      const objectToCreate = {
        ...req.body,
      }

      // await WorkroleValidate.create(objectToCreate)

      const Workrole = await WorkroleStore.create(objectToCreate)

      utils.sendSuccess(res, 200, Workrole)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      const { workroleId } = req.params

      const whatToUpdate = {
        ...req.body,
      }

      // await WorkroleValidate.update(whatToUpdate)

      await WorkroleStore.update(workroleId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'Workrole Updated Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { workroleId } = req.params

      await WorkroleStore.delete(workroleId)

      utils.sendSuccess(res, 200, { message: 'Workrole Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new WorkroleController()