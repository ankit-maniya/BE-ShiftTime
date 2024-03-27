"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const shiftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointmentId: {
        type: String,
    },
    clientId: {
        type: Number,
    },
    start_date: {
        type: Date, default: new Date()
    },
    end_date: {
        type: Date, default: new Date()
    },
    duration: {
        type: Number,
    },
    notes: {
        type: String,
    },
    createdOn: {
        type: Number
    },
    updatedOn: {
        type: Number
    },
    isPublised: {
        type: Boolean,
        default: false
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
shiftSchema.plugin(mongoosePaginate)

const Shift = mongoose.model('Shift', shiftSchema)

export default Shift