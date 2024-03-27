"use strict"

/*** Global ***/
import utils from '../global/index.js'

/**
  * This function is used for validate shift detail
  * @function create
  * @param { Object } shift shift's details
  * @returns { Boolean } return the meta for shift validatation
*/

const create = async (shift) => {
    const keys = Object.keys(shift)

    if (keys.length < 2)
        throwError('startDate & endDate fields are required!')

    if (!keys.includes('startDate')) {
        throwError('startDate field is required!')
    }

    if (!keys.includes('endDate'))
        throwError('endDate field is required!')

    if (keys.includes('startDate') && shift.startDate === '')
        throwError('startDate field is required!')

    if (keys.includes('endDate') && shift.endDate === '')
        throwError('endDate field is required!')
}

/**
  * This function is used for validate shift detail
  * @function employeeWise
  * @param { Object } shift shift's details
  * @returns { Boolean } return the meta for shift validatation
*/

const employeeWise = async (shift) => {
    const keys = Object.keys(shift)

    if (keys.length < 3)
        throwError('startDate, endDate & userId fields are required!')

    if (!keys.includes('startDate'))
        throwError('startDate field is required!')

    if (!keys.includes('endDate'))
        throwError('endDate field is required!')

    if (!keys.includes('userId'))
        throwError('userId field is required!')

    if (keys.includes('startDate') && shift.startDate === '')
        throwError('startDate field is required!')

    if (keys.includes('endDate') && shift.endDate === '')
        throwError('endDate field is required!')

    if (keys.includes('userId') && shift.userId === '')
        throwError('userId field is required!')
}

/**
  * This function is used for throw error
  * Note: used for only this page for throw error
  * @function throwError
  * @param { Number || String || Object || Array } message error details
  * @returns { Boolean } return the meta for error
*/

const throwError = (message) => {
    return utils.throwError(500, '', message)()
}

export default {
    create,
    employeeWise
}