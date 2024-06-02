const User = require("../modal/userModal")
module.exports = new (class userService {
  async registerUser(user) {
    try {
      const res = await User.create(user)
      return res
    } catch (error) {
      console.log(9, error)
      return error.errors[0].message
    }
  }
})()
