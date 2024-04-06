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

  getAllSubscriptionsOfCustomer = async (req, res) => {
    try {

      await stripeValidate.getAllSubscriptionsOfCustomer(req.query);

      const { customerId } = req.query;

      const subscriptions = await StripeStore.getAllSubscriptionsOfCustomer(customerId);

      const finalResponse = {
        subscriptions: subscriptions.data.map((sub) => {
          return {
            id: sub.id,
            created: sub.created,
            currency: sub.currency,
            current_period_start: sub.current_period_start,
            current_period_end: sub.current_period_end,
            latest_invoice: sub.latest_invoice,
            purchased_items: (sub?.items?.data || []).map((item) => {
              return {
                id: item.id,
                created: item.created,
                plan: item.plan.id,
                quantity: item.quantity,
                price: item.price,
              }
            }),
          }
        }),
      }

      utils.sendSuccess(res, 200, finalResponse)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  checkoutProduct = async (req, res) => {
    try {

      await stripeValidate.checkoutProduct(req.body);
      const { priceId, quantity, customer } = req.body;

      const whatToCheckOut = {
        priceId,
        quantity,
        customer,
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

      const { name, email, address = "" } = req.body;

      const whatToCreate = {
        name,
        email,
        address,
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