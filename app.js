'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'Hola mundo' })
})

module.exports = app
