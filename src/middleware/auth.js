const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/default")
const whiteRouter = require("../common/whiteRouter")
const auth = async (ctx, next) => {
  if (!whiteRouter.includes(ctx.originalUrl)) {
    const { authorization } = ctx.request.header
    const token = authorization.replace("Bearer ", "")
    try {
      const user = jwt.verify(token, JWT_SECRET)
      ctx.state.user = user
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        ctx.app.emit("error", 500, "用户信息已过期", ctx)
        return
      } else if (error.name === "JsonWebTokenError") {
        ctx.app.emit("error", 500, "无效的用户信息", ctx)
        return
      }
    }
  }
  await next()
}
module.exports = auth
