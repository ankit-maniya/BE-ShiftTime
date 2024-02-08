"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import bcrypt from "bcrypt"

/*** Customs ***/
import constant from '../global/constant.js'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  role: {
    type: String,
    enum: [constant.USER, constant.RESTAURANT, constant.ADMIN],
    default: constant.USER
  },
  lastName: {
    type: String
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

userSchema.pre("save", async function () {
  this.password = await this.generatePasswordHash()
})

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10
  return await bcrypt.hash(this.password, saltRounds)
}

export const validatePassword = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword)
}

/*** Initalize Plugin For Paginate ***/
userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema)

export default User