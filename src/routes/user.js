const koaRouter = require("koa-router")
const router = new koaRouter({ prefix: "/user" })
const { register } = require("../controller/userController")
router.post("/register", register)
module.exports = router
