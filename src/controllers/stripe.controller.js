"use strict"

/*** Global ***/
import utils from '../global/index.js'

/*** Middleware ***/
import { StripeStore } from '../stores/index.js';
import { stripeValidate } from '../validations/index.js';

class StripeController {
  getAllProducts = async (req, res) => {
    try {

      const products = await StripeStore.getAllProducts();

      utils.sendSuccess(res, 200, products)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  checkoutProduct = async (req, res) => {
    try {

      await stripeValidate.checkoutProduct(req.body);

      const whatToCheckOut = {
        priceId: req.body.priceId,
        quantity: req.body.quantity,
        customer: req.body.customer,
      }

      const returnUri = req.headers.origin;

      const checkoutSessionUri = await StripeStore.checkoutProduct(whatToCheckOut, returnUri);
      utils.sendSuccess(res, 200, checkoutSessionUri)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  createCustomer = async (req, res) => {
    try {

      await stripeValidate.createCustomer(req.body);

      const whatToCreate = {
        name: req.body.name,
        email: req.body.email,
        address: req.body?.address || "",
      }

      console.log(whatToCreate);
      const customer = await StripeStore.createCustomer(whatToCreate);
      utils.sendSuccess(res, 200, customer)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new StripeController()