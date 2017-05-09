'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/User')
const service = require('../services')

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
              res.status(500).send({ msg: 'Error al guardar el usuario'})
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
              res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user)
              })
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

function updateUser(req, res) {
  let userId = req.params.id
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if(err) {
      res.status(500).send({ msg: 'Error al actualizar el usuario' })
    }else{
      if(!userUpdated) {
        res.status(404).send({ msg: 'No se ha podido actualizar el usuario' })
      }else{
        res.status(200).send({ user: userUpdated })
      }
    }
  })
}

function uploadImage(req, res) {
  let userId = req.params.id
  let file_name = "No subido..."

  if(req.files) {
    let file_path = req.files.image.path
    let file_split = file_path.split('\/')
    let file_name = file_split[2]

    let ext_split = file_name.split('\.')
    let file_ext = ext_split[1]

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
        if(!userUpdated){
          res.status(404).send({ msg: 'No se ha podido actualizar el usuario' })
        }else{
          res.status(200).send({ user: userUpdated })
        }
      })
    }else{
      res.status(200).send({ msg: 'Extensión de archivo no válida'})
    }
    
  }else{
    res.status(200).send({ msg: 'No has subido ninguna imagen' })
  }
}

module.exports = {
  test,
  signup,
  signin,
  updateUser,
  uploadImage
}