'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    match: [/^[a-zA-Z0-9]+$/, 'El formato username no es válido'],
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'El formato de email no es válido'],
    minlength: [6, 'La contraseña debe tener 6 caracteres o más.'],
    index: true
  },
  bio: String,
  image: String,
  password: String,
  favorites: [{ type: Schema.ObjectId, ref: 'Post'}],
  following: [{ type: Schema.ObjectId, ref: 'User'}]
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)