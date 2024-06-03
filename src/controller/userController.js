const {
  registerUser,
  updateUser,
  deleteUser,
} = require("../service/userService")
const jwt = require("jsonwebtoken")
const svgCaptcha = require("svg-captcha")
const { JWT_SECRET } = require("../config/default")
module.exports = new (class UserController {
  //注册用户
  async register(ctx, next) {
    const user = ctx.request.body
    try {
      const res = await registerUser(user)
      ctx.body = {
        code: 200,
        result: { id: res.id, userName: res.userName },
        messgae: "操作成功",
      }
    } catch (error) {
      ctx.app.emit("error", 500, "注册错误", ctx)
    }
  }
  //更新用户
  async update(ctx, next) {
    const user = ctx.request.body
    try {
      const res = await updateUser(user)
      if (res > 0) {
        ctx.app.emit("success", null, null, ctx)
      } else {
        ctx.app.emit("error", 500, "更新失败", ctx)
      }
    } catch (error) {
      ctx.app.emit("error", 500, "更新失败", ctx)
    }
  }
  //用户删除
  async deleteOne(ctx, next) {
    const { id } = ctx.request.query
    try {
      const res = await deleteUser(id)
      if (res > 0) {
        ctx.app.emit("success", null, null, ctx)
      } else {
        ctx.app.emit("error", 500, "删除失败", ctx)
      }
    } catch (error) {
      console.error(error)
      ctx.app.emit("error", 500, "删除失败", ctx)
    }
  }
  //用户登录
  async login(ctx, next) {
    const { password, ...resUser } = ctx.state.user.dataValues
    const token = jwt.sign(resUser, JWT_SECRET, { expiresIn: "12h" })
    ctx.app.emit("success", { token: token }, "登录成功", ctx)
  }
  //获取验证码
  async getCaptcha(ctx, next) {
    const captcha = svgCaptcha.create({
      inverse: false, // 翻转颜色
      fontSize: 48, // 字体大小
      noise: 3, // 干扰线条数
      width: 120, // 宽度
      height: 38, // 高度
      size: 6, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      color: true, // 验证码是否有彩色
      background: "#c0c6cc", // 验证码图片背景颜色
    })
    const code = captcha.text.toLowerCase()
    ctx.body = captcha.data
  }
})()
