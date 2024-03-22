/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { ShiftStore } from '../stores/index.js'

/*** Validation ***/
// import { ShiftValidate } from '../validations/index.js'

class ShiftController {
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

      const BookOffs = await ShiftStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, BookOffs)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.shiftId
      }

      console.log(query);

      const Shift = await ShiftStore.get(query)
      utils.sendSuccess(res, 200, Shift)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      const objectToCreate = {
        ...req.body,
      }

      // await ShiftValidate.create(objectToCreate)

      const Shift = await ShiftStore.create(objectToCreate)

      utils.sendSuccess(res, 200, Shift)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      const { shiftId } = req.params

      const whatToUpdate = {
        ...req.body,
      }

      // await ShiftValidate.update(whatToUpdate)

      await ShiftStore.update(shiftId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'Shift Updated Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { shiftId } = req.params

      await ShiftStore.delete(shiftId)

      utils.sendSuccess(res, 200, { message: 'Shift Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new ShiftController()