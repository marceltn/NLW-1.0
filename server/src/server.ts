import express from 'express'

const app = express()

const users = [
  'Alice',
  'Bob',
  'Marcel',
]

app.get('/', () => {
  console.log('me achou!')
})

app.get('/hello', (req, res) => {
  return res.json({ sucess: true })
})

app.get('/v1/users', (req, res) => {
  const search = String(req.query.search)

  if(!search) return res.status(400).json({ error: true, message: 'Query not allowed'})

  const filteredUser = search ? users.filter(user => user.includes(search)) : users

  return res.json(filteredUser)
})

app.get('/v1/users/:id', (req, res) => {
  const user = users[Number(req.params.id)]

  if(!user) return res.status(400).json({ error: true, message: 'User not found' })

  return res.status(200).send(user)
})

app.post('/v1/users', (req, res) => {
  const user = {
    name: 'Marcel',
    email: 'marcel@email.com'
  }

  return res.json(user)
})

app.listen(3000)

