"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  status: {
    type: String,
    default: 'User'
  },
  clientId: {
    type: String
  },
  stripeId: {
    type: String
  },
  subscription: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  country: {
    type: String
  },
  birthdate: {
    type: String
  },
  height: {
    type: String
  },
  weight: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  mobile: {
    type: Number,
  },
  countryCode: {
    type: Number
  },
  profileImage: {
    type: String
  },
  role: {
    type: String,
    default: 'User'
  },
  allImages: {
    type: Array
  },
  subscription: {
    type: [JSON]
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
  loginWith: {
    type: Number,
    enum: [0, 1, 2], /*** [ 0 => mobile or email, 1 => google, 2 => facebook ] ***/
    default: 0
  },
}, { timestamps: true, strict: false })

/*** Initalize Plugin For Paginate ***/
userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema)

export default User