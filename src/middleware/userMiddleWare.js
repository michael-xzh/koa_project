const { getUserInfo } = require("../service/userService")
//判断用户是否存在
const userExist = async (ctx, next) => {
  const user = ctx.request.body
  try {
    const res = await getUserInfo(user)
    if (res) {
      ctx.app.emit("error", 500, "用户已存在", ctx)
      return
    }
  } catch (error) {
    console.error("用户查询", error)
    ctx.app.emit("error", 500, "用户注册错误", ctx)
    return
  }
  await next()
}
//判断是否有用户名
const userRequest = async (ctx, next) => {
  const { userName } = ctx.request.body
  if (!userName) {
    ctx.app.emit("error", 500, "用户名是必须的", ctx)
    return
  }
  await next()
}

module.exports = {
  userExist,
  userRequest,
}
