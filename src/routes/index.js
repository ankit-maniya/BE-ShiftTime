"use strict"

/*** Third Party Packages ***/
import express from 'express';

/*** Global ***/
import utils from '../global/index.js'

/*** Controllers ***/
import { user, availability, category, bookoff } from '../controllers/index.js'

/*** Middleware ***/
import { me } from '../middlewares/index.js'
import EmailService from '../global/EmailService.js';

const routes = express.Router()

/*** TEST ***/
routes.get('/', (req, res) => utils.sendSuccess(res, 200, { label: 'Api Working Fine!!' }))
// routes.get('/test', async (req, res) => {
//     await EmailService.sendMail({
//         from: 'Amaniya4606@conestogac.on.ca',
//         to: 'pratikboghani1@gmail.com',
//         subject: 'Otp 9999',
//         text: 'This is a test email OTP is 9999'
//     })

//     utils.sendSuccess(res, 200, { label: 'Api Working Fine!!' })
// })

/*** USER ***/
routes.get('/users', user.getAll)
routes.get('/users/:userId', user.get)
routes.post('/users/signup', user.create)
routes.post('/users/login', user.login)
routes.put('/users/:userId', me, user.update)
routes.delete('/users/:userId', me, user.delete)

/*** AVAILABILITY ***/
routes.get('/availability', availability.getAll)
routes.get('/availability/:availibilityId', availability.get)
routes.post('/availability/create', availability.create)
routes.put('/availability/:availibilityId', me, availability.update)
routes.delete('/availability/:availibilityId', me, availability.delete)

/*** CATEGORY ***/
routes.get('/category', category.getAll)
routes.get('/category/:categoryId', category.get)
routes.post('/category/create', category.create)
routes.put('/category/:categoryId', me, category.update)
routes.delete('/category/:categoryId', me, category.delete)

/*** BOOK-OFF ***/
routes.get('/bookoff', bookoff.getAll)
routes.get('/bookoff/:bookOffId', bookoff.get)
routes.post('/bookoff/create', bookoff.create)
routes.put('/bookoff/:bookOffId', me, bookoff.update)
routes.delete('/bookoff/:bookOffId', me, bookoff.delete)

export default routes