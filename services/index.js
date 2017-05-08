'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

exports.createToken = (user) => {
  const payload = {
    sub: user._id,
    username: user.username,
    email: user.email,
    bio: user.bio,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}