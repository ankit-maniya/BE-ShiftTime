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
    clientId: {
        type: Number,
    },
    start_date: {
        type: String, maxlength: 100
    },
    end_date: {
        type: String, maxlength: 100
    },
    duration: {
        type: String
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