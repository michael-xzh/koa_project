const {
  registerUser,
  updateUser,
  deleteUser,
} = require("../service/userService")
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
})()
