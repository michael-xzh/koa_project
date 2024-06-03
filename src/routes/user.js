const koaRouter = require("koa-router")
const router = new koaRouter({ prefix: "/user" })
const {
  register,
  update,
  deleteOne,
  login,
  getCaptcha,
} = require("../controller/userController")
const {
  userExist,
  userRequest,
  passwordBcrypt,
  verifyLogin,
} = require("../middleware/userMiddleWare")
router.post("/register", userRequest, userExist, passwordBcrypt, register)
router.post("/update", update)
router.get("/delete", deleteOne)
router.post("/login", userRequest, verifyLogin, login)
router.get("/captcha", getCaptcha)
module.exports = router
