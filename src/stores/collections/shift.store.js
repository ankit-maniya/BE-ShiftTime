"use strict";

/*** Third Party Packages ***/
import moment from "moment";

/*** Global ***/
import utils from "../../global/index.js";

/*** Model Schema ***/
import { Shift } from "../../models/index.js";

/*** BaseModal ***/
import BaseModal from "../base.store.js";

class ShiftStore extends BaseModal {
  /*** NOTE: it's require to declare whenever you extends BaseModal ***/
  model = Shift;

  getAllByAggregate = async (aggregate) => {
    try {
      return await this.model.aggregate(aggregate);
    } catch (exception) {
      utils.throwError(500, "", `Error while getting ${this.modal}`)(exception);
    }
  }

  getAll = async (query, projection, sort) => {
    try {
      return await super.getAll(query, projection, null, sort, null, 100);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting Shift")(exception);
    }
  };

  getWithSort = async (query, sortBy) => {
    try {
      return await this.model.find(query).sort(sortBy);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single Shift")(  exception);
    }
  };

  get = async (query) => {
    try {
      return await super.get(query);
    } catch (exception) {
      utils.throwError(500, "", "Error while getting single Shift")(exception);
    }
  };

  create = async (objectToCreate) => {
    try {
      if (!objectToCreate.createdOn) {
        objectToCreate.createdOn = moment().valueOf();
      }

      return await super.create(objectToCreate);
    } catch (exception) {
      utils.throwError(500, "", "Error while creating Shift")(exception);
    }
  };

  update = async (id, whatToUpdate, whatDoDelete) => {
    try {
      if (!whatToUpdate.updatedOn) {
        whatToUpdate.updatedOn = moment().valueOf();
      }

      return await super.update(id, whatToUpdate, whatDoDelete);
    } catch (exception) {
      utils.throwError(500, "", "Error while updating Shift")(exception);
    }
  };

  delete = async (ShiftId) => {
    try {
      return await super.delete(ShiftId);
    } catch (exception) {
      utils.throwError(500, "", "Error while deleting Shift")(exception);
    }
  };
}

export default new ShiftStore();
