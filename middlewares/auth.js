'use strict'

const services = require('../services')

exports.isAuth = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(403).send({ msg: 'No tienes autorización '})
  }

  const token = req.headers.authorization.replace(/[""]+/g,'')

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}