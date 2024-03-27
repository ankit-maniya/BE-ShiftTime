/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { BookOffStore } from '../stores/index.js'

/*** Validation ***/
// import { BookOffValidate } from '../validations/index.js'

class BookOffController {
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

      const BookOffs = await BookOffStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, BookOffs)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.bookOffId
      }

      const BookOff = await BookOffStore.get(query)
      utils.sendSuccess(res, 200, BookOff)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      const objectToCreate = {
        ...req.body,
      }

      // await BookOffValidate.create(objectToCreate)

      const BookOff = await BookOffStore.create(objectToCreate)

      utils.sendSuccess(res, 200, BookOff)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      const { bookOffId } = req.params

      const whatToUpdate = {
        ...req.body,
      }

      // await BookOffValidate.update(whatToUpdate)

      await BookOffStore.update(bookOffId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'BookOff Updated Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { bookOffId } = req.params

      await BookOffStore.delete(bookOffId)

      utils.sendSuccess(res, 200, { message: 'BookOff Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new BookOffController()