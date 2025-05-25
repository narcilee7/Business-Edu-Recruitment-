import Koa from 'koa'
import KoaLogger from 'koa-logger'

const app = new Koa()

app.use(KoaLogger())

export default app