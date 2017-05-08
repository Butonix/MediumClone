'use strict'

const express = require('express')
const UserController = require('../controllers/userController')

var api = express.Router()

api.get('/test-controlador', UserController.test)
api.post('/register', UserController.signup)

module.exports = api

