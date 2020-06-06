import express from 'express'

const app = express()

app.get('/', () => {
  console.log('me achou!')
})

app.get('/hello', (req, res) => {
  return res.json({ sucess: true })
})

app.get('/v1/users', (req, res) => {
  return res.json([
    'Alice',
    'Bob',
    'Marcel',
  ])
})

app.post('/v1/users', (req, res) => {
  const user = {
    name: 'Marcel',
    email: 'marcel@email.com'
  }

  return res.json(user)
})

app.listen(3000)

