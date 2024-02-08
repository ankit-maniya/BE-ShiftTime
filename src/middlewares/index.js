"use strict"

/*** Third Party Packages ***/
import jwt from 'jsonwebtoken'

/*** Global ***/
import utils from '../global/index.js'

/*** Customs ***/
import { config } from '../configs/index.js'
import { UserStore } from '../stores/index.js'

/**
  * This function is used as middleware for validate requests
  * in specifed routes
  * @function me
  * @param { Object | Array | String | Number } req
  * @param { Object | Array | String | Number } res
  * @param { } next apply for go to next function 
  * @returns { Object } return the meta for Send Success Response
*/

const me = async (req, res, next) => {
  try {

    let idToken = req.headers.authorization

    if (!idToken || !idToken.startsWith('Bearer ')) {
      return utils.sendError(res, 404, 'Token is not available or is Invalid.')()
    }

    idToken = idToken.replace('Bearer ', '')

    if (!idToken) {
      return utils.sendError(res, 404, 'Token is not available.')()
    }

    req.user = await verifyAuthToken(idToken)

    next()
  } catch (exception) {
    utils.sendError(res, 500, 'Error while verify Auth Token')(exception)
  }
}


/**
  * This function is used for create a token
  * in specifed routes
  * @function createAuthToken
  * @param { Object } user get user data for token
  * @param { String } expire for valid time for use this token 
  * @returns { String } return the meta user token
*/

const createAuthToken = async (user, expire = '1h') => {
  const { email, userName, _id, role } = user

  return await jwt.sign({ email, userName, _id, role }, config.JWT_SECRET, { expiresIn: expire })
}


/**
  * This function is used for verify a token in specifed routes
  * @function verifyAuthToken
  * @param { String } idToken token of user
  * @returns { String } return the meta user
*/

const verifyAuthToken = async (idToken) => {
  try {
    const token = await jwt.verify(idToken, config.JWT_SECRET)

    let userData = null

    if (token) {
      userData = await UserStore.get({ _id: token._id })
    }

    if (!userData) throw "Your Session Expired! Login Now!!"

    if (userData && userData.isActive == false) throw "Your Account is Locked By Admin"

    return userData
  } catch (exception) {
    utils.throwError(500, '', 'Error while verify Auth Token')(exception)
  }
}

export {
  me,
  createAuthToken,
  verifyAuthToken
}