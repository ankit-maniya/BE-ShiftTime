/*** Third Party Packages ***/
import moment from 'moment'

/*** Global ***/
import utils from '../../global/index.js'

/*** Model Schema ***/
import { User } from '../../models/index.js'

/*** BaseModal ***/
import BaseModal from '../base.store.js'

class UserStore extends BaseModal {
    /*** NOTE: it's require to declare whenever you extends BaseModal ***/
    model = User

    getAll = async (query, projection, sort) => {
      try {
        return await super.getAll(query, projection, null, sort)
      } catch (exception) {
        utils.throwError(500, '', 'Error while getting users')(exception)
      }
    }

    get = async (query) => {
      try {
        return await super.get(query)
      } catch (exception) {
        utils.throwError(500, '', 'Error while getting single user')(exception)
      }
    }

    create = async (objectToCreate) => {
      try {

        if (!objectToCreate.createdOn) {
          objectToCreate.createdOn = moment().valueOf()
        }

        return await super.create(objectToCreate)
      } catch (exception) {
        utils.throwError(500, '', 'Error while creating user')(exception)
      }
    }

    update = async (id, whatToUpdate, whatDoDelete) => {
      try {

        if (!whatToUpdate.updatedOn) {
          whatToUpdate.updatedOn = moment().valueOf()
        }

        return await super.update(id, whatToUpdate, whatDoDelete)
      } catch (exception) {
        utils.throwError(500, '', 'Error while updating user')(exception)
      }
    }

    delete = async (userId) => {
      try {
        return await super.delete(userId)
      } catch (exception) {
        utils.throwError(500, '', 'Error while deleting user')(exception)
      }
    }
}

export default new UserStore()