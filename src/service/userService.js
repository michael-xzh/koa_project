const User = require("../modal/userModal")
module.exports = new (class userService {
  //注册用户
  async registerUser(user) {
    const res = await User.create(user)
    return res
  }
  //更新用户
  async updateUser(user) {
    const res = await User.update(user, { where: { id: user.id } })
    return res
  }
  //根据用户名后者id查找用户
  async getUserInfo({ id, userName }) {
    const query = {}
    id && Object.assign(query, { id })
    userName && Object.assign(query, { userName })
    const res = await User.findOne({ where: query })
    return res
  }
  //用户删除
  async deleteUser(id) {
    const res = await User.destroy({ where: { id: id } })
    return res
  }
})()
