"use strict"

import dotenv from "dotenv"
import constant from "../global/constant.js"

dotenv.config()

const {
  PORT,
  HOST,
  PORT_URL,
  MONGO_URL,
  FILE_STORE_PATH,
  TEMP_FILE_STORE_PATH,
  USER_FILE_STORE_PATH,
  RESTAURENT_FILE_STORE_PATH,
  ADMIN_FILE_STORE_PATH,
  VIEWS_FILES_PATH,
  SALT,
  JWT_SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  FIREBASE_APIKEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_IMAGE_URL
} = process.env

const ADMIN_USER = {
  isActive: true,
  isDelete: false,
  role: constant.SUPERADMIN,
  loginWith: 0,
  firstName: "ShiftTime",
  lastName: "Super Admin",
  userName: "shifttime SuperAdmin",
  mobile: "2268832602",
  name: "ShiftTime SuperAdmin",
  email: "superadmin@shifttime.com",
  password: "shifttime@2024",
}

export const config = {
  PORT,
  HOST,
  PORT_URL,
  MONGO_URL,
  FILE_STORE_PATH,
  TEMP_FILE_STORE_PATH,
  USER_FILE_STORE_PATH,
  RESTAURENT_FILE_STORE_PATH,
  ADMIN_FILE_STORE_PATH,
  VIEWS_FILES_PATH,
  SALT,
  JWT_SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  ADMIN_USER,
  FIREBASE_APIKEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_IMAGE_URL
}