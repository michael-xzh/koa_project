module.exports = new (class UserController {
  async register(ctx, next) {
    console.log(3, ctx.request.body)
    ctx.body = "访问成功"
  }
})()
