const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const multer = require('multer')
var path = require('path')
const auth = require('../middleware/auth')
// const upload = multer({ dest: 'avator' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //文件存储目录
    cb(null, path.join(__dirname, '../avator'))
    //我这里的路径是与node项目同级而不是在node项目中
    //这样写当每次更新服务器代码的时候不会导致静态资源的冲突
  },
  filename: function (req, file, cb) {
    //文件名 multer不会存储文件后缀 需自己添加
    var fileFormat = file.originalname.split('.')
    cb(
      null,
      'rty_blog' + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]
    )
  },
})
var upload = multer({
  storage: storage,
})

const router = express.Router()

// Authentication 用户登录
router.post('/user/login', userValidator.login, userCtrl.login)

// Registration 用户注册
router.post('/user/register', userValidator.register, userCtrl.register)

// ChangeInfo 用户注册
router.post('/user/change', auth, upload.single('avator'), userCtrl.changeInfo)

// Get Current User 获取当前登录用户
// router.get('/user', auth, userCtrl.getCurrentUser)

// Update User 更新用户
// router.put('/user', auth, userCtrl.updateUser)

module.exports = router
