"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const workroleSchema = new mongoose.Schema({
    clientId: {
        type: Number,
        required: true
    },
    role: {
        type: String, required: true
    },
    createdOn: {
        type: Number
    },
    updatedOn: {
        type: Number
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
workroleSchema.plugin(mongoosePaginate)

const Workrole = mongoose.model('Workrole', workroleSchema)

export default Workrole