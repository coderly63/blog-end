const mongoose = require('mongoose')
const baseModle = require('./base-model')
const md5 = require('../util/md5')

const userSchema = new mongoose.Schema({
  ...baseModle,
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
    select: false,
  },
  nickname: {
    type: String,
    default: null,
  },
  avator: {
    type: String,
    default: null,
  },
})

module.exports = userSchema
