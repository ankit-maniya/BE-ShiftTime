"use strict"
/*** Third Party Packages ***/
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
const app = express()

/*** Customs ***/
import { config } from './src/configs/index.js';
import routes from './src/routes/index.js';
import connectDB, { UserStore } from './src/stores/index.js';

const startServer = async () => {
  /*** Apply Middleware ***/
  app.use(cors())
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('uploads'))

  /*** ApI Routes ***/
  app.use(routes)

  /*** Start Server ***/
  app.listen(config.PORT, () => {
    console.log(`server start at ${config.PORT_URL}`)

    /*** Check Database Server Connection ***/
    connectDB().then(async () => {
      console.log('Mongodb Connected!')
      const foundUser = await UserStore.get({ email: config.ADMIN_USER.email })

      if (!foundUser) {
        await UserStore.create(config.ADMIN_USER)
      }
    })
  })
}

startServer();