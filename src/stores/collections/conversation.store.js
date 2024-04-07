"use strict";

/*** Third Party Packages ***/
import moment from "moment";

/*** Global ***/
import utils from "../../global/index.js";

/*** Model Schema ***/
import { Conversation } from "../../models/index.js";

/*** BaseModal ***/
import BaseModal from "../base.store.js";

class ConversationStore extends BaseModal {
  /*** NOTE: it's require to declare whenever you extends BaseModal ***/
  model = Conversation;

  getAll = async (query, projection, sort) => {
    try {
      return await super.getAll(query, projection, null, sort);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting Conversations")(exception);
    }
  };

  getWithSort = async (query, sortBy) => {
    try {
      return await this.model.find(query).sort(sortBy);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single Conversation")(exception);
    }
  };

  get = async (query) => {
    try {
      return await super.get(query);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single Conversation")(exception);
    }
  };

  create = async (objectToCreate) => {
    try {
      if (!objectToCreate.createdOn) {
        objectToCreate.createdOn = moment().valueOf();
      }

      return await super.create(objectToCreate);
    } catch (exception) {
      utils.throwError(500, "", "Error while creating Conversation")(exception);
    }
  };

  update = async (id, whatToUpdate, whatDoDelete) => {
    try {
      if (!whatToUpdate.updatedOn) {
        whatToUpdate.updatedOn = moment().valueOf();
      }

      return await super.update(id, whatToUpdate, whatDoDelete);
    } catch (exception) {
      utils.throwError(500, "", "Error while updating Conversation")(exception);
    }
  };

  delete = async (categoryId) => {
    try {
      return await super.delete(categoryId);
    } catch (exception) {
      utils.throwError(500, "", "Error while deleting Conversation")(exception);
    }
  };
}

export default new ConversationStore();
