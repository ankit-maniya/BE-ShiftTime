"use strict"

/*** Global ***/
import utils from '../global/index.js'

/**
  * This function is used for validate conversation detail
  * @function create
  * @param { Object } conversation conversation's details
  * @returns { Boolean } return the meta for conversation validatation
*/

const create = async (conversation) => {
    const keys = Object.keys(conversation)

    if (keys.length < 4)
        throwError('type, firstName, lastName, message & emailId fields are required!')

    if (!keys.includes('type'))
        throwError('type field is required!')

    if (!keys.includes('emailId'))
        throwError('emailId field is required!')

    if (keys.includes('firstName') && conversation.firstName === '')
        throwError('firstName field is required!')

    if (keys.includes('lastName') && conversation.lastName === '')
        throwError('lastName field is required!')

    if (keys.includes('message') && conversation.message === '')
        throwError('message field is required!')

    if (keys.includes('type') && conversation.type === '')
        throwError('type field is required!')

    if (keys.includes('emailId') && conversation.emailId === '')
        throwError('emailId field is required!')
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
    create
}