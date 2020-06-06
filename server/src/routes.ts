import express from 'express'
const routes = express.Router()

routes.get('/v1', (req, res) => {
  return res.json({ sucess: true })
})

export default routes
