"use strict"

/*** Node Packages ***/
import fs from 'fs'
import path from 'path'

/*** Custom Modules ***/
import constant from './constant.js'

/**
  * This function is used for Send Success Response
  * @function sendSuccess
  * @param { } res it's instance of response
  * @param { Object | Array } response it's a data you want to send
  * @param { Number } status status code for response
  * @returns { Object } return the meta for Send Success Response
*/

const sendSuccess = (res, status = 200, response) => {
  res.status(status)
  .header('Content-Type', 'application/json', 'access-control-allow-origin', '*')
  .send({
    response: (response || {}),
    message: 'Data Fetched!',
    type: constant.SUCCESS
  })
}

/**
  * This function is used for Send Error Response
  * @function sendError
  * @param res it's instance of response
  * @param { String } message it's a data you want to send
  * @param { Number } status status code for response
  * @param { Error } error it's a exception
  * @returns { Object } return the meta for Send Error Response
*/

const sendError = (res, status = 500, message = '') => (error) => {
  const data = {
    type: constant.ERROR,
    message,
    response: {}
  }

  if (error) {
    data.message = (error.message || error)
  }
  
  res.status(status)
  .header('Content-Type', 'application/json', 'access-control-allow-origin', '*')
  .send(data)
}


/**
  * This function is used for Throw Error while no res instance provided
  * @function throwError
  * @param { String | Object } errorType it's instance of error
  * @param { String } errorMessage it's a data you want to send
  * @param { Number } code status code for response
  * @param { Error } error it's a exception
  * @returns { Object } return the meta for Send Error Response
*/

const throwError = (code, errorType, errorMessage) => (error) => {
  if (!error) error = new Error(errorMessage || 'Default Error')

  error.code = code
  error.errorType = errorType

  throw error
}

/**
  * This function is used for generate random code
  * @function generateCode
  * @param length lenght of code
  * @returns { Object } return the meta for random code
*/

const generateCode = (length = 6) => {
  let result           = ''
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

 return result
}


/**
  * This function is used for remove file
  * @function removeFile
  * @param file file that sent from user
  * @returns not return anything
*/

const removeFile = (file) => {
  fs.unlink(path.join(file.path), (err) => {
    console.log(err)
  })
}

export default {
  sendSuccess,
  sendError,
  throwError,
  generateCode,
  removeFile
}