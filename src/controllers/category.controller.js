/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { CategoryStore } from '../stores/index.js'

/*** Validation ***/
// import { CategoryValidate } from '../validations/index.js'

class CategoryController {
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

      const Categorys = await CategoryStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, Categorys)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.categoryId
      }

      const Category = await CategoryStore.get(query)
      utils.sendSuccess(res, 200, Category)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      const objectToCreate = {
        ...req.body,
      }

      // await CategoryValidate.create(objectToCreate)

      const Category = await CategoryStore.create(objectToCreate)

      utils.sendSuccess(res, 200, Category)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      const { categoryId } = req.params

      const whatToUpdate = {
        ...req.body,
      }

      // await CategoryValidate.update(whatToUpdate)

      await CategoryStore.update(categoryId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'Category Updated Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { categoryId } = req.params

      await CategoryStore.delete(categoryId)

      utils.sendSuccess(res, 200, { message: 'Category Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new CategoryController()