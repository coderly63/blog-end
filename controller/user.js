const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// Authentication 用户登录
exports.login = async (req, res, next) => {
  try {
    // 处理请求
    // 得到用户信息[mongosse数据对象 转换成 json数据对象]
    const user = req.user.toJSON()
    console.log('exports.login= ~ user:', user)
    // 生成token
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      // 设置token过期时间，单位为秒
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    )
    // 移除密码属性
    delete user.password
    // 发送成功响应（包含token的用户信息）
    res.status(200).json({
      code: 200,
      msg: 'ok',
      data: {
        ...user,
        token,
      },
    })
  } catch (err) {
    next(err)
  }
}

// Registration 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body)
    // 保存到数据库
    await user.save()
    user = user.toJSON()
    delete user.password
    // 4. 发送成功响应
    res.status(201).json({
      code: 200,
      msg: 'ok',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

// Get Current User 获取当前登录用户
exports.changeInfo = async (req, res, next) => {
  try {
    // 处理请求
    console.log('req', req.file, req.body)
    const user = req.user
    const updateUser = req.body
    user.nickname = updateUser.nickname || user.nickname
    // user.avator = 'http://49.233.45.84:3333/' + req.file.filename
    user.avator = 'http://localhost:3333/' + req.file.filename
    const userJson = user.toJSON()
    await user.save()
    res.status(200).json({
      user: userJson,
    })
  } catch (err) {
    next(err)
  }
}

// Update User 更新用户
exports.updateUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('put /user')
  } catch (err) {
    next(err)
  }
}
