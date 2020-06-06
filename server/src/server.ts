import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listen on port ${port}`))
