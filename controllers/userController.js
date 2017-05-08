'use strict'

function test (req, res) {
  res.status(200).send({
    msg: 'Probando el controlador de usuarios'
  })
}

module.exports = {
  test
}