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

function signin(req, res) {
  let params = req.body

  let email = params.email
  let password = params.password

  User.findOne({email: email}, (err, user) => {
    if(err) {
      res.status(500).send({ msg: 'Error en la petición'})
    }else{
      if(!user) {
        res.status(404).send({ msg: 'El usuario no existe'})
      }else{
        // Comprobamos la contraseña
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(isMatch && !err){
            // Devolvemos los datos del usuario registrado
            if(params.gethash){
              // Devolvemos un token de jwt
            }else{
              res.status(200).send({user})
            }
          }else{
            res.status(404).send({message: 'El usuario no se ha podido loguear'})
          }
        })
      }
    }
  })
}

module.exports = {
  test,
  signup,
  signin
}