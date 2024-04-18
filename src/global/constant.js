"use strict"

/*** Defined Constant Values ***/
const constant = {
    STATUS: {
        ACTIVE: "active",
    },
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    SUPERADMIN: "SUPERADMIN",
    EMPLOYEE: "EMPLOYEE",
    ADMIN: "ADMIN",
    ROLES: ["SUPERADMIN", "ADMIN", "EMPLOYEE"],
    TRIAL: "TRIAL",
    SILVER: "SILVER",
    GOLD: "GOLD",
    PLANS: ["TRIAL", "SILVER", "GOLD"],
    INIT_CLIENTID: 1001,
    DAY_OF_WEEK_ENUM: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    AVAILABILITY_TYPE: ['AVAILABLE', 'UNAVAILABLE'],
    PAYMENT_MODE: {
        SUBSCRIPTION: "subscription",
        PAYMENT: "payment"
    },
    STRIPE_RETURN_URL: "https://shifttime.vercel.app/subscription",
}

export default constant;