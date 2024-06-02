const { registerUser } = require("../service/userService")
module.exports = new (class UserController {
  async register(ctx, next) {
    const user = ctx.request.body
    try {
      const res = await registerUser(user)
      ctx.body = {
        code: 200,
        result: res,
        messgae: "操作成功",
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        result: null,
        message: error,
      }
    }
  }
})()
