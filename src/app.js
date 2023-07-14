const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

// init middleware
app.use(morgan('dev')) // khi dev thì nên bật mode này
app.use(helmet())
app.use(compression())

// init db

// init routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    msg: 'oki',
    metadata: 'compression'.repeat(100000),
  })
})

// handling error
app.get('/', (err, req, res, next) => {})

module.exports = app
