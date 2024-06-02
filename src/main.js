const app = require("./app/index")
const config = require("./config/default")

app.listen(config.APP_PORT, () => {
  console.log(
    `************启动成功************\n serve is running http://localhost:${config.APP_PORT}`
  )
})
