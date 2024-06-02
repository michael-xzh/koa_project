const fs = require("fs")
const koaRouter = require("koa-router")
const router = new koaRouter()
fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== "index.js") {
    const file = require("./" + fileName)
    router.use(file.routes())
  }
})
module.exports = router
