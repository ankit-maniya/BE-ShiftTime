"use strict"

/*** Third Party Packages ***/
import mongoose from "mongoose"
import UserStore from "./collections/user.store.js"
import AvailabilityStore from "./collections/availability.store.js"
import CategoryStore from "./collections/category.store.js"
import BookOffStore from "./collections/bookoff.store.js"
import ShiftStore from "./collections/shift.store.js"

/*** Config ***/
import { config } from "../configs/index.js"
const connectDB = () => {
    /*** Apply Connection With DB ***/
    return mongoose.connect(config.MONGO_URL)
}

export default connectDB

export {
    UserStore,
    AvailabilityStore,
    CategoryStore,
    BookOffStore,
    ShiftStore
}
