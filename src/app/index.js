const koa = require("koa")
const app = new koa()
const { koaBody } = require("koa-body")
const router = require("../routes/index")
const errorResult = require("./errorResult")
const successResult = require("./successResult")
//处理接收body参数
app.use(koaBody())

//统一注册路由
app.use(router.routes()).use(router.allowedMethods())
//统一成功结果返回
app.on("success", successResult)
//统一错误处理
app.on("error", errorResult)
module.exports = app
