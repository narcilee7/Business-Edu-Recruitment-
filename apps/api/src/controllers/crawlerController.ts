import { Context } from "koa";


const crawlerByteDance = async (ctx: Context) => {
  const url = ctx.query.url as string
  if (!url) {
    ctx.status = 400
    ctx.body = { message: 'url is required' }
    return
  }
  // try {
  //   const jobs = await crawlJobPage(url)
  //   ctx.body = jobs
  // } catch (error) {
  //   ctx.status = 500
  //   ctx.body = { message: '爬取失败' }
  // }
}

export {
  crawlerByteDance,
}