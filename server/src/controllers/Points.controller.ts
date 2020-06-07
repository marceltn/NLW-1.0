import { Request, Response } from 'express'
import knex from '../database'

class PointsController {
  async show(req: Request, res: Response) {
    const { id } = req.params

    const [point] = await knex('points').where('id', id)

    if(!point) return res.status(400).json({error: true, messageg: 'Point not found'})

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return res.status(200).json({point, items})
  }

  async create(req: Request, res: Response) {
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
  }
}

export default PointsController