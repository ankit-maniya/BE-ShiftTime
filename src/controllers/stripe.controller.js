"use strict"

import constant from '../global/constant.js';
/*** Global ***/
import utils from '../global/index.js'
import { createAuthToken } from '../middlewares/index.js';

/*** Middleware ***/
import { StripeStore, UserStore } from '../stores/index.js';
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

      let subscriptions = await StripeStore.getAllSubscriptionsOfCustomer(customerId);
      subscriptions = await utils.modifySubscriptionRespons(subscriptions);

      const finalResponse = {
        subscriptions
      }

      utils.sendSuccess(res, 200, finalResponse)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }

  getAllInvoicesOfCustomer = async (req, res) => {
    try {

      await stripeValidate.getAllInvoicesOfCustomer(req.query);

      const { customerId } = req.query;

      const invoices = await StripeStore.getAllInvoicesOfCustomer(customerId);

      const finalResponse = {
        invoices: invoices.data.map((invoice) => {
          return {
            id: invoice.id,
            created: invoice.created,
            currency: invoice.currency,
            invoice_pdf: invoice.invoice_pdf,
            number: invoice.number,
            paid: invoice.paid,
            period_end: invoice.period_end,
            period_start: invoice.period_start,
            status: invoice.status,
            subtotal: invoice.subtotal
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

      const { priceId, quantity, customerId } = req.body;

      const query = {
        _id: customerId
      }

      const user = await UserStore.get(query);

      if(!user) {
        utils.throwError(404, constant.ERROR, `User not found with Id: ${customerId}`)()
      }

      const { firstName, lastName, email, address = "" } = user;
      let stripeCustomerId = user?.stripeCustomerId || "";

      if (!stripeCustomerId) {
        const name = `${firstName} ${lastName}`;

          const whatToCreate = {
            name,
            email,
            address,
          }

          const stripeCustomer = await StripeStore.createCustomer(whatToCreate);
          await UserStore.updateByWhere(query, { stripeCustomerId: stripeCustomer.id })
          stripeCustomerId = stripeCustomer.id;
      }

      // once we have stripe Customer Id then we can checkout the product
      const whatToCheckOut = {
        priceId,
        quantity,
        customer: stripeCustomerId,
      }

      const returnUri = constant.STRIPE_RETURN_URL;

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

  getCurrentActivePlanOfCustomer = async (req, res) => {
    try {

      await stripeValidate.getCurrentActivePlanOfCustomer(req.query);

      const { customerId } = req.query;

      let user = await UserStore.get({ _id: customerId });

      if (!user) utils.throwError(404, constant.ERROR, `User not found with Id: ${customerId}`)()
      const token = await createAuthToken(user)

      let activePlan = {};
      if (user.stripeCustomerId) {
        let subscriptions = await StripeStore.getAllSubscriptionsOfCustomer(user.stripeCustomerId);
        subscriptions = await utils.modifySubscriptionRespons(subscriptions);

        activePlan = (subscriptions || [])?.find((subscription) => subscription.status === constant.STATUS.ACTIVE) || {};
      }

      user = {
        user,
        activePlan,
        token
      }

      utils.sendSuccess(res, 200, user)
    } catch (exception) {
      utils.sendError(res, 500)(exception)
    }
  }
}

export default new StripeController()