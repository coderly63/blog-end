const express = require("express");
const router = express.Router();

// 用户相关路由
router.use(require("./user"));

// 文章评论
router.use(require("./comment"));

module.exports = router;
