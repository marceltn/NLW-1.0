import express from 'express'

const app = express()

app.get('/', () => {
  console.log('me achou!')
})

app.get('/hello', (req, res) => {
  return res.json({ sucess: true })
})

app.get('/users', (req, res) => {
  return res.json([
    'Alice',
    'Bob',
    'Marcel',
  ])
})

app.listen(3000)
