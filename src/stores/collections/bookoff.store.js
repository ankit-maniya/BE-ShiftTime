"use strict";

/*** Third Party Packages ***/
import moment from "moment";

/*** Global ***/
import utils from "../../global/index.js";

/*** Model Schema ***/
import { BookOff } from "../../models/index.js";

/*** BaseModal ***/
import BaseModal from "../base.store.js";

class BookOffStore extends BaseModal {
  /*** NOTE: it's require to declare whenever you extends BaseModal ***/
  model = BookOff;

  getAll = async (query, projection, sort) => {
    try {
      return await super.getAll(query, projection, null, sort);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting BookOff")(exception);
    }
  };

  getWithSort = async (query, sortBy) => {
    try {
      return await this.model.find(query).sort(sortBy);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single BookOff")(exception);
    }
  };

  get = async (query) => {
    try {
      return await super.get(query);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single BookOff")(exception);
    }
  };

  create = async (objectToCreate) => {
    try {
      if (!objectToCreate.createdOn) {
        objectToCreate.createdOn = moment().valueOf();
      }

      return await super.create(objectToCreate);
    } catch (exception) {
      utils.throwError(500, "", "Error while creating BookOff")(exception);
    }
  };

  update = async (id, whatToUpdate, whatDoDelete) => {
    try {
      if (!whatToUpdate.updatedOn) {
        whatToUpdate.updatedOn = moment().valueOf();
      }

      return await super.update(id, whatToUpdate, whatDoDelete);
    } catch (exception) {
      utils.throwError(500, "", "Error while updating BookOff")(exception);
    }
  };

  delete = async (BookOffId) => {
    try {
      return await super.delete(BookOffId);
    } catch (exception) {
      utils.throwError(500, "", "Error while deleting BookOff")(exception);
    }
  };
}

export default new BookOffStore();
