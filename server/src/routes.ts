import express from 'express'
import knex from './database'
const routes = express.Router()

const generateResourceUrl = (resource: string): string => `/v1${resource}`

routes.get(generateResourceUrl('/items'), async (req, res) => {
  const items = await knex('items').select('*')

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3000/uploads/${item.image}`
    }
  })

  return res.json(serializedItems)
})

routes.post(generateResourceUrl('/points'), async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = req.body

  const trx = await knex.transaction()

  console.log('before insert points')

  const [insertedId] = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  })

  const point_id = insertedId

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id,
    }
  })

  await trx('point_items').insert(pointItems)

  await trx.commit()

  return res.json({success: true, id: point_id})
})

export default routes
