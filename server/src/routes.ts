import express from 'express'
import PointCtrl from './controllers/Points.controller'
import ItemCtrl from './controllers/Items.controller'

const routes = express.Router()
const pointCtrl = new PointCtrl()
const itemCtrl = new ItemCtrl()

const generateResourceUrl = (resource: string): string => `/v1${resource}`

routes.get(generateResourceUrl('/items'), itemCtrl.index)

routes.get(generateResourceUrl('/points/:id'), pointCtrl.show)
routes.post(generateResourceUrl('/points'), pointCtrl.create)

export default routes
