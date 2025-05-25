import { Context } from "koa";


const crawlerByteDance = async (ctx: Context) => {
  const url = ctx.query.url as string
  if (!url) {
    ctx.status = 400
    ctx.body = { message: 'url is required' }
    return
  }
}

export {
  crawlerByteDance,
}