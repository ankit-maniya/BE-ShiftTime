"use strict"

/*** Third Party Packages ***/
import stripe from 'stripe';

/*** Global ***/
import utils from "../../global/index.js";

/*** Configs ***/
import { config } from '../../configs/index.js';

/*** Constant ***/
import constant from '../../global/constant.js';

class StripeStore {
    stripeRef = new stripe(config.STRIPE_SECRET_KEY);

    getAllProducts = async () => {
        try {
            const products = await this.stripeRef.products.list({
                limit: 3,
                expand: ['data.default_price'],
            });

            return products;
        } catch (exception) {
            utils.throwError(500, "", "Error while getting Stripe Products")(exception);
        }
    };

    getAllSubscriptionsOfCustomer = async (customerId) => {
        try {
            const subscriptions = await this.stripeRef.subscriptions.list({
                limit: 3,
                customer: customerId,
            });

            return subscriptions;
        } catch (exception) {
            utils.throwError(500, "", "Error while getting Stripe Subscriptions")(exception);
        }
    };

    getAllInvoicesOfCustomer = async (customerId) => {
        try {
            const invoices = await this.stripeRef.invoices.list({
                limit: 10,
                customer: customerId,
            });

            return invoices;
        } catch (exception) {
            utils.throwError(500, "", "Error while getting Stripe Invoices")(exception);
        }
    };

    checkoutProduct = async (whatToCheckOut, returnUri) => {
        try {
            const session = await this.stripeRef.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: whatToCheckOut.priceId,
                        quantity: whatToCheckOut.quantity,
                    },
                ],
                customer: whatToCheckOut.customer,
                mode: constant.PAYMENT_MODE.SUBSCRIPTION,
                success_url: `${returnUri}/?success=true`,
                cancel_url: `${returnUri}/?canceled=true`,
            });

            return { uri: session.url };
        } catch (exception) {
            utils.throwError(500, "", "Error while generating checkout uri")(exception);
        }
    };

    createCustomer = async (whatToCreate) => {
        try {
            const customer = await this.stripeRef.customers.create(whatToCreate);
            return customer;
        } catch (exception) {
            utils.throwError(500, "", "Error while generating checkout uri")(exception);
        }
    };
}

export default new StripeStore();