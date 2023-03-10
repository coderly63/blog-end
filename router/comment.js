const express = require('express')
const commentCtrl = require('../controller/comment')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取评论列表
router.get('/comment/list', commentCtrl.getCommentList)

// 发布评论
router.post('/comment/add', auth, commentCtrl.addComments)

// 点赞评论
router.post('/comment/like', auth, commentCtrl.likeComment)

// Registration 用户注册
// router.post('/user/register', userValidator.register, userCtrl.register)

module.exports = router
