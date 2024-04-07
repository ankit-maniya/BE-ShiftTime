/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { ConversationStore } from '../stores/index.js'

/*** Validation ***/
import { conversationValidate } from '../validations/index.js'

class ConversationController {
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

      const Conversations = await ConversationStore.getAll(whatToSearch, projection, sort)

      utils.sendSuccess(res, 200, Conversations)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  get = async (req, res) => {
    try {
      const query = {
        _id: req.params.conversationId
      }

      const Conversation = await ConversationStore.get(query)
      utils.sendSuccess(res, 200, Conversation)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  create = async (req, res) => {
    try {
      const objectToCreate = {
        ...req.body,
      }

      await conversationValidate.create(objectToCreate)

      const Conversation = await ConversationStore.create(objectToCreate)

      utils.sendSuccess(res, 200, Conversation)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  update = async (req, res) => {
    try {
      const { conversationId } = req.params

      const whatToUpdate = {
        ...req.body,
      }

      await ConversationStore.update(conversationId, whatToUpdate)

      utils.sendSuccess(res, 200, { message: 'Conversation Updated Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  delete = async (req, res) => {
    try {
      const { conversationId } = req.params

      await ConversationStore.delete(conversationId)

      utils.sendSuccess(res, 200, { message: 'Conversation Deleted Successfully!' })
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new ConversationController()