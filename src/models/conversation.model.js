"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const conversationSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdOn: {
        type: Number
    },
    updatedOn: {
        type: Number
    },
    isViewed: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, strict: false })

/*** Initalize Plugin For Paginate ***/
conversationSchema.plugin(mongoosePaginate)

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation