/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { AvailabilityStore } from '../stores/index.js'

/*** Validation ***/
// import { AvailabilityValidate } from '../validations/index.js'

class AvailibilityController {
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

      const Availabilitys = await AvailabilityStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, Availabilitys)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.availibilityId
      }

      console.log(query);

      const Availability = await AvailabilityStore.get(query)
      utils.sendSuccess(res, 200, Availability)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      const objectToCreate = {
        ...req.body,
      }

      // await AvailabilityValidate.create(objectToCreate)

      const Availability = await AvailabilityStore.create(objectToCreate)

      utils.sendSuccess(res, 200, Availability)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      const { availabilityId } = req.params

      const whatToUpdate = {
        ...req.body,
      }

      // await AvailabilityValidate.update(whatToUpdate)

      await AvailabilityStore.update(availabilityId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'Avalibility Updated Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { availibilityId } = req.params

      await AvailabilityStore.delete(availibilityId)

      utils.sendSuccess(res, 200, { message: 'Availability Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new AvailibilityController()