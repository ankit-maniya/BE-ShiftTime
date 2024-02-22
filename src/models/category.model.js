"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const categorySchema = new mongoose.Schema({
    clientId: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
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
categorySchema.plugin(mongoosePaginate)

const Category = mongoose.model('Category', categorySchema)

export default Category