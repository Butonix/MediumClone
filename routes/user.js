'use strict'

const express = require('express')
const UserController = require('../controllers/userController')

const api = express.Router()
const auth = require('../middlewares/auth')


api.get('/test-controlador', auth.isAuth, UserController.test)
api.post('/register', UserController.signup)
api.post('/login', UserController.signin)

module.exports = api

