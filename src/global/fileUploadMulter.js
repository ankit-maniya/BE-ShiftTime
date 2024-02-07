"use strict"

/*** Third Party Packages ***/
import multer from "multer"
import pify from "pify"

/*** Node Packages ***/
import path from "path"

/*** Multer Disk Storage MiddleWare ***/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.originalname.split(".").pop())
  },
})


/*** File Type Validation ***/
const checkfiletype = (file, cb) => {
  const fileType = /jpeg|jpg|png|gif/
  const extType = fileType.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileType.test(file.mimetype)
  if (extType && mimeType) {
    return cb(null, true)
  } else {
    return cb(null, false)
  }
}


/*** Initalize a Multer Storage ***/
export const uploadFileToStorage = pify(
  multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: async (req, file, cb) => {
      checkfiletype(file, cb)
    }
  }).fields([
    { name: "profileImage", maxCount: 1 },
    { name: "allImages", maxCount: 10 },
    { name: "menuImage", maxCount: 1 },
  ])
)