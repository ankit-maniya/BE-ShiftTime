"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

/*** Customs ***/
import constant from '../global/constant.js'

const availibilitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    availibilityDetails: [
        {
            day_of_week: {
                type: String, enum: constant.DAY_OF_WEEK_ENUM, required: true
            },
            start_time: {
                type: String, maxlength: 100, required: true
            },
            end_time: {
                type: String, maxlength: 100, required: true
            },
            availability_type: {
                type: String, enum: constant.AVAILABILITY_TYPE
            },
        }
    ],
    notes: {
        type: String,
    },
    createdOn: {
        type: Number
    },
    updatedOn: {
        type: Number
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, strict: false })

/*** Initalize Plugin For Paginate ***/
availibilitySchema.plugin(mongoosePaginate)

const Availability = mongoose.model('Availability', availibilitySchema)

export default Availability