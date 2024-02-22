"use strict";

/*** Third Party Packages ***/
import moment from "moment";

/*** Global ***/
import utils from "../../global/index.js";

/*** Model Schema ***/
import { Workrole } from "../../models/index.js";

/*** BaseModal ***/
import BaseModal from "../base.store.js";

class WorkroleStore extends BaseModal {
  /*** NOTE: it's require to declare whenever you extends BaseModal ***/
  model = Workrole;

  getAll = async (query, projection, sort) => {
    try {
      return await super.getAll(query, projection, null, sort);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting Workrole")(exception);
    }
  };

  getWithSort = async (query, sortBy) => {
    try {
      return await this.model.find(query).sort(sortBy);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single Workrole")(exception);
    }
  };

  get = async (query) => {
    try {
      return await super.get(query);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single Workrole")(exception);
    }
  };

  create = async (objectToCreate) => {
    try {
      if (!objectToCreate.createdOn) {
        objectToCreate.createdOn = moment().valueOf();
      }

      return await super.create(objectToCreate);
    } catch (exception) {
      utils.throwError(500, "", "Error while creating Workrole")(exception);
    }
  };

  update = async (id, whatToUpdate, whatDoDelete) => {
    try {
      if (!whatToUpdate.updatedOn) {
        whatToUpdate.updatedOn = moment().valueOf();
      }

      return await super.update(id, whatToUpdate, whatDoDelete);
    } catch (exception) {
      utils.throwError(500, "", "Error while updating Workrole")(exception);
    }
  };

  delete = async (WorkroleId) => {
    try {
      return await super.delete(WorkroleId);
    } catch (exception) {
      utils.throwError(500, "", "Error while deleting Workrole")(exception);
    }
  };
}

export default new WorkroleStore();
