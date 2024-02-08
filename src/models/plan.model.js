"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

/*** Customs ***/
import constant from '../global/constant.js'

const planSchema = new mongoose.Schema({
  planImage: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  plan: {
    type: String,
    enum: [constant.TRIAL, constant.SILVER, constant.GOLD],
  },
  planPrice: {
    type: String,
    default: 0.0
  },
  expiry: {
    type: String,
  },
  createdOn: {
    type: Number
  },
  updatedOn: {
    type: Number
  },
}, { timestamps: true, strict: false })

/*** Initalize Plugin For Paginate ***/
planSchema.plugin(mongoosePaginate)

const Plan = mongoose.model('Plan', planSchema)

export default Plan