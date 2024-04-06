"use strict"

/*** Global ***/
import utils from '../global/index.js'

/**
  * This function is used for validate customer details
  * @function createCustomer
  * @param { Object } customer customer's details
  * @returns { Boolean } return the meta for customer validatation
*/

const createCustomer = async (customer) => {
    const keys = Object.keys(customer)

    if (keys.length < 2)
        throwError('name & email fields are required!')

    if (!keys.includes('name')) {
        throwError('name field is required!')
    }

    if (!keys.includes('email'))
        throwError('email field is required!')

    if (keys.includes('name') && customer.name === '')
        throwError('name field shold not be empty!')

    if (keys.includes('email') && customer.email === '')
        throwError('email field shold not be empty!')

    if (keys.includes('address') && customer.address === '')
        throwError('address field shold not be empty!')
}

/**
  * This function is used for validate checkout product details
  * @function checkoutProduct
  * @param { Object } checkout checkout's details
  * @returns { Boolean } return the meta for checkout validatation
*/

const checkoutProduct = async (checkout) => {
    const keys = Object.keys(checkout)

    if (keys.length < 3)
        throwError('priceId, customer & quantity fields are required!')

    if (!keys.includes('priceId')) {
        throwError('priceId field is required!')
    }

    if (!keys.includes('quantity'))
        throwError('quantity field is required!')

    if (!keys.includes('customer'))
        throwError('customer field is required!')

    if (keys.includes('priceId') && checkout.priceId == '')
        throwError('priceId field shold not be empty!')

    if (keys.includes('customer') && checkout.customer == '')
        throwError('customer field shold not be empty!')

    if (keys.includes('quantity') && checkout.quantity == 0)
        throwError('quantity field shold not be 0!')
}

/**
  * This function is used for validate query params
  * @function getAllSubscriptionsOfCustomer
  * @param { Object } customer customer's details
  * @returns { Boolean } return the meta for customer validatation
*/

const getAllSubscriptionsOfCustomer = async (customer) => {
    const keys = Object.keys(customer)

    if (keys.length < 1)
        throwError('customerId field is required!')

    if (!keys.includes('customerId')) {
        throwError('customerId field is required!')
    }

    if (keys.includes('customerId') && customer.customerId == '')
        throwError('customerId field shold not be empty!')
}

/**
  * This function is used for validate query params
  * @function getAllInvoicesOfCustomer
  * @param { Object } customer customer's details
  * @returns { Boolean } return the meta for customer validatation
*/

const getAllInvoicesOfCustomer = async (customer) => {
    const keys = Object.keys(customer)

    if (keys.length < 1)
        throwError('customerId field is required!')

    if (!keys.includes('customerId')) {
        throwError('customerId field is required!')
    }

    if (keys.includes('customerId') && customer.customerId == '')
        throwError('customerId field shold not be empty!')
}

/**
  * This function is used for validate query params
  * @function getCurrentActivePlanOfCustomer
  * @param { Object } customer customer's details
  * @returns { Boolean } return the meta for customer validatation
*/

const getCurrentActivePlanOfCustomer = async (customer) => {
    const keys = Object.keys(customer)

    if (keys.length < 1)
        throwError('customerId field is required!')

    if (!keys.includes('customerId')) {
        throwError('customerId field is required!')
    }

    if (keys.includes('customerId') && customer.customerId == '')
        throwError('customerId field shold not be empty!')
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
    createCustomer,
    checkoutProduct,
    getAllSubscriptionsOfCustomer,
    getAllInvoicesOfCustomer,
    getCurrentActivePlanOfCustomer
}