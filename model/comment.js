const mongoose = require('mongoose')
const baseModle = require('./base-model')

const commentSchema = new mongoose.Schema({
  ...baseModle,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  action: {
    type: Number,
    default: 0, // 1 赞 2 踩
  },
  replyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  nums: {
    type: Number,
    default: 0,
  },
})

module.exports = commentSchema
