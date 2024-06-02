module.exports = (code, error, ctx) => {
  if (code === 401) ctx.status = code
  ctx.body = {
    code: code || 500,
    result: null,
    message: error || "操作失败",
  }
}
