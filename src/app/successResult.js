module.exports = (data, message, ctx) => {
  ctx.body = {
    code: 200,
    result: data || null,
    message: message || "操作成功",
  }
}
