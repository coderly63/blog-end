const { Comment } = require('../model')

exports.getCommentList = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate('userId').populate('replyId')
    console.log('exports.getCommentList= ~ comments', comments)
    // 4. 发送成功响应
    res.status(201).json({
      code: 200,
      msg: 'ok',
      data: comments,
    })
  } catch (err) {
    next(err)
  }
}

exports.addComments = async (req, res, next) => {
  try {
    const comment = new Comment(req.body)
    console.log('exports.addComments= ~ comment', comment)
    await comment.save()
    // 4. 发送成功响应
    res.status(201).json({
      code: 200,
      msg: 'ok',
    })
  } catch (err) {
    next(err)
  }
}

exports.likeComment = async (req, res, next) => {
  try {
    const params = req.body
    const comment = await Comment.findById(params.commentId)
    comment.nums += params.action
    await comment.save()
    // 4. 发送成功响应
    res.status(201).json({
      code: 200,
      msg: 'ok',
    })
  } catch (err) {
    next(err)
  }
}
