const koa = require("koa")
const app = new koa()
const { koaBody } = require("koa-body")

const userRouter = require("../routes/user")
app.use(koaBody())
app.use(userRouter.routes())

module.exports = app
