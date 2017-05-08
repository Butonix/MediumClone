'use strict'

const mongoose = require('mongoose')

const app = require('./app')
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/medium', (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida correctamente...')
})

app.listen(port, () => {
  console.log(`API Rest corriendo en http://localhost:${port}`)
})

