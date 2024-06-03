const { getUserInfo } = require("../service/userService")
const bcrypt = require("bcryptjs")
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
//密码加密
const passwordBcrypt = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}
//用户登录校验
const verifyLogin = async (ctx, next) => {
  //判断用户是否存在
  const { userName, password } = ctx.request.body
  try {
    const res = await getUserInfo({ userName })
    if (!res) {
      console.error("用户不存在")
      return ctx.app.emit("error", 500, "用户不存在", ctx)
    }
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit("error", 500, "密码错误", ctx)
    }
    ctx.state.user = res
    await next()
    //密码解密
  } catch (error) {
    console.error("登录失败")
    return ctx.app.emit("error", 500, "登录失败", ctx)
  }
}

module.exports = {
  userExist,
  userRequest,
  passwordBcrypt,
  verifyLogin,
}
