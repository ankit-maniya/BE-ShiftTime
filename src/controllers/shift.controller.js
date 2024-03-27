/*** Global ***/
import utils from '../global/index.js'

/*** Store ***/
import { ShiftStore } from '../stores/index.js'

/*** Validation ***/
// import { ShiftValidate } from '../validations/index.js'

class ShiftController {
  getAllShiftsForDate = async (req, res) => {
    try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;

      const whatToMatch = {
        $match: {
          start_date: {
            $gte: new Date(startDate),
          },
          end_date: {
            $lte: new Date(endDate)
          }
        }
      }

      const wrokRoleLookUp = {
        $lookup: {
          from: 'categories',
          localField: 'workRole',
          foreignField: '_id',
          as: 'workRole'
        }
      }

      const usersLookUp = {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          pipeline: [
            wrokRoleLookUp,
            {
              $unwind: '$workRole'
            }
          ],
          as: 'user'
        }
      }

      const aggregate = [];

      if (whatToMatch) {
        aggregate.push(whatToMatch);
      }

      if (usersLookUp) {
        aggregate.push(usersLookUp);
        aggregate.push({ $unwind: '$user' });
      }

      const groupByWorkingRole = {
        $group: {
          _id: "$user.workRole.category",
          employees: {
            $push: {
              _id: "$_id",
              firstName: "$user.firstName",
              start_date: "$start_date",
              end_date: "$end_date",
              duration: "$duration",
              notes: "$notes"
            }
          }
        }
      }

      aggregate.push(groupByWorkingRole);

      const data = await ShiftStore.getAllByAggregate(aggregate);
      utils.sendSuccess(res, 200, data)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  getAllShiftsForWeek = async (req, res) => {
    try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;

      const whatToMatch = {
        $match: {
          start_date: {
            $gte: new Date(startDate),
          },
          end_date: {
            $lte: new Date(endDate)
          }
        }
      }

      const wrokRoleLookUp = {
        $lookup: {
          from: 'categories',
          localField: 'workRole',
          foreignField: '_id',
          as: 'workRole'
        }
      }

      const usersLookUp = {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          pipeline: [
            wrokRoleLookUp,
            {
              $unwind: '$workRole'
            }
          ],
          as: 'user'
        }
      }

      const aggregate = [];

      aggregate.push({
        $sort: {
          start_date: 1
        }
      });

      if (whatToMatch) {
        aggregate.push(whatToMatch);
      }

      if (usersLookUp) {
        aggregate.push(usersLookUp);
        aggregate.push({ $unwind: '$user' });
      }

      const groupByEmployee = {
        $group: {
          _id: {
            wrokingRole: "$user.workRole.category",
            userid: "$user._id"
          },
          shifts: {
            $push: {
              firstName: "$user.firstName",
              start_date: "$start_date",
              end_date: "$end_date",
              duration: "$duration",
              notes: "$notes"
            }
          }
        }
      }

      aggregate.push(groupByEmployee);

      const groupByWorkingRole = {
        $group: {
          _id: "$_id.wrokingRole",
          employees: {
            $push: '$$ROOT'
          }
        }
      }

      aggregate.push(groupByWorkingRole);

      const data = await ShiftStore.getAllByAggregate(aggregate);
      utils.sendSuccess(res, 200, data)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

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

      if (objectToCreate.start_date) {
        objectToCreate.start_date = objectToCreate.start_date;
      }

      if (objectToCreate.end_date) {
        objectToCreate.end_date = objectToCreate.end_date;
      }

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