"use strict"

/*** Third Party Packages ***/
import moment from 'moment'

/*** Global ***/
import utils from '../global/index.js'

class BaseModal {
  constructor(name) {
    this.model = name
  }

  /**
    * This function is used for Get All record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function getAll
    * @param { Object | String } query page number to get
    * @param { Object | String } projection used for selection required fields
    * @param { Array | Object | String } populate populate another collection data based on objectId
    * @param { Object | String } sort sort the datas
    * @param { Number } limit number of datas per page/request
    * @returns { Object } return the meta for pagination
  */

  async getAll(query = {}, projection, populate, sort, paginationOption, limit=100) {
    try {
      let options = {}

      if (projection) {
        options.projection = projection
      }

      if (populate) {
        options.populate = populate
      }

      if (sort) {
        options.sort = sort
      }

      if (paginationOption && Object.keys(paginationOption) >= 2) {
        const { offset, page } = paginationOption

        options.offset = offset
        options.page = page
      }

      if (limit) {
        options.limit = limit
      }
      
      return await this.model.paginate(query, options)
    } catch (exception) {
      utils.throwError(500, '', `Error while getting ${this.modal}`)(exception)
    }
  }


  /**
    * This function is used for get record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function get
    * @param { Object | String } id specific Id for get data
    * @param { Object } objectToCreate object that you want to create
    * @returns { Object } return the meta for get user
  */

   async get(query) {
    try {
      return await this.model.findOne(query)
    } catch (exception) {
      utils.throwError(500, '', `Error while getting ${this.modal}`)(exception)
    }
  }

  /**
    * This function is used for Create record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function create
    * @param { Object } objectToCreate object that you want to create
    * @returns { Object } return the meta for created user
  */

  async create(objectToCreate) {
    try {

      return await this.model.create(objectToCreate)
    } catch (exception) {
      utils.throwError(500, '', `Error while getting ${this.modal}`)(exception)
    }
  }


  /**
    * This function is used for Get Update record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function update
    * @param { Object | String } id specific Id for update data
    * @param { Object } whatToUpdate object that you want to update
    * @param { Object } whatDoDelete object that you want to delete
    * @returns { Object } return the meta for created user
  */

   async update(id, whatToUpdate, whatDoDelete) {
    try {
      const query = {
        _id: id
      }

      return await this.updateByWhere(query, whatToUpdate, whatDoDelete)
    } catch (exception) {
      utils.throwError(500, '', `Error while updating ${this.modal}`)(exception)
    }
  }


  /**
    * This function is used for Get Update record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function updateByWhere
    * @param { Object } query object that you can update specific data 
    * @param { Object } whatToUpdate object that you want to update
    * @param { Object } whatDoDelete object that you want to delete
    * @returns { Object } return the meta for created user
  */

  async updateByWhere(query, whatToUpdate, whatDoDelete) {
    try {
      if ((!whatToUpdate || Object.keys(whatToUpdate).length <= 0)
          && (!whatDoDelete || Object.keys(whatDoDelete).length <= 0)) {
        return {}
      }

      let newChanges = {
        $set: {
          updatedOn: moment().valueOf(),
          ...(whatToUpdate || {})
        }
      }

      if (whatDoDelete && Object.keys(whatDoDelete).length > 0) {
        newChanges = {
          ...newChanges,
          $unset: {
            ...whatDoDelete
          }
        }
      }

      return await this.model.updateOne(query, newChanges)
    } catch (exception) {
      utils.throwError(500, '', `Error while updating ${this.model}`)(exception)
    }
  }


  /**
    * This function is used for Delete record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function delete
    * @param { Object | String } id specific Id for delete data
    * @returns { Object } return the meta for created user
  */

  async delete(id) {
    try {
      await this.model.deleteOne({ _id: id })
    } catch (exception) {
      utils.throwError(500, '', `Error deleting ${this.model}`)(exception)
    }
  }


  /**
    * This function is used for Delete record from database
    * NOTE: don't use arrow funtion syntax it will gives error 
    * @function deleteByWhere
    * @param { Object } where object that you can passing clause you want to delete 
    * @returns { Object } return the meta for created user
  */

  async deleteByWhere(where) {
    try {
      await this.model.deleteMany(where)
    } catch (exception) {
      utils.throwError(500, '', `Error deleting ${this.model}`)(exception)
    }
  }
}

export default BaseModal 