import express from 'express'
import knex from './database'
const routes = express.Router()

const generateResourceUrl = (resource: string): string => `/v1/${resource}`

routes.get(generateResourceUrl('items'), async (req, res) => {
  const items = await knex('items').select('*')

  const serializedItems = items.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3000/uploads/${item.image}`
    }
  })

  return res.json(serializedItems)
})

export default routes
