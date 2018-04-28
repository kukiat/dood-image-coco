const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(morgan('tiny'))

const options = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'] 
}
app.use(cors(options))

app.use('/', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server start port${PORT}`)
})