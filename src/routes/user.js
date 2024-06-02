const koaRouter = require("koa-router")
const router = new koaRouter({ prefix: "/user" })
const { register, update, deleteOne } = require("../controller/userController")
const { userExist, userRequest } = require("../middleware/userMiddleWare")
router.post("/register", userRequest, userExist, register)
router.post("/update", update)
router.get("/delete", deleteOne)
module.exports = router
