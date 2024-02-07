/*** Third Party Packages ***/
import express from 'express';

/*** Global ***/
import utils from '../global/index.js'

/*** Controllers ***/
import { user } from '../Controllers/index.js'

/*** Middleware ***/
import { me } from '../Middlewares/index.js'

const routes = express.Router()

/*** TEST ***/
routes.get('/', (req, res) => utils.sendSuccess(res, 200, { label: 'Api Working Fine!!' }))

/*** USER ***/
routes.get('/users', user.getAll)
routes.get('/users/:userId', user.get)
routes.post('/users/signup', user.create)
routes.post('/users/login', user.login)
routes.put('/users/:userId', me, user.update)
routes.delete('/users/:userId', me, user.delete)

export default routes