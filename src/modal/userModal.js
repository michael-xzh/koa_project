const { DataTypes } = require("sequelize")
const seq = require("../db/index")
const User = seq.define(
  "mc_users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户名 唯一 不为空",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: "密码 不为空",
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      comment: "性别 1男 2 女",
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      defaultValue: 1,
      comment: "状态不为空 1启用 2禁用",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      comment: "邮箱",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      comment: "手机号",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      comment: "头像",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      comment: "描述",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      comment: "地址",
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
      comment: "生日",
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      comment: "昵称",
    },
  },
  {
    underscored: true, //使用下划线命名数据库字段
    timestamps: true, //需要时间戳
  }
)
module.exports = User
