"use strict"

/*** Defined Constant Values ***/
const constant = {
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
    }
}

export default constant;