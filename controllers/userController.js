'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/User')

function test (req, res) {
  res.status(200).send({
    msg: 'Probando el controlador de usuarios'
  })
}

function signup(req, res) {
  let params = req.body
  let user = new User({
    username: params.username,
    email: params.email,
    password: params.password,
    bio: params.bio
  })

  console.log(params)

  if(params.password){
    // Encriptamos la contraseña
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return err
      bcrypt.hash(params.password, salt, null, (err, hash) => {
        user.password = hash
        if(user.username != null && user.email != null){
          // Guardamos el usuario
          user.save((err, userStored) => {
            if(err){
              // res.status(500).send({ msg: 'Error al guardar el usuario'})
              console.log(err)
            }else{
              res.status(200).send({ user: userStored})
            }
          })
        }else{
          res.status(200).send({ msg: 'Rellena los campos vacíos'})
        }
      })
    })
  }else{
    res.status(500).send({ msg: 'Introduce la contraseña'})
  }
}

module.exports = {
  test,
  signup
}