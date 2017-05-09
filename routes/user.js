'use strict'

const express = require('express')
const UserController = require('../controllers/userController')

const api = express.Router()
const auth = require('../middlewares/auth')

const multiparty = require('connect-multiparty')
const upload = multiparty({ uploadDir: './uploads/users' })


api.get('/test-controlador', auth.isAuth, UserController.test)
api.post('/register', UserController.signup)
api.post('/login', UserController.signin)
api.put('/update-user/:id', auth.isAuth, UserController.updateUser)
api.post('/upload-avatar/:id', [auth.isAuth, upload], UserController.uploadImage)

module.exports = api

