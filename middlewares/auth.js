'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

exports.isAuth = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(403).send({ msg: 'No tienes autorización' })
  }

  const token = req.headers.authorization.replace(/[""]+/g, '')
  const payload = jwt.decode(token, config.SECRET_TOKEN)

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ msg: 'El token ha expirado' })
  }

  req.user = payload.sub
  next()
}