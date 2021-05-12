import moduleAlias from 'module-alias'
import path from 'path'
import Koa from 'koa'
import KoaBody from 'koa-body'
import cors from '@koa/cors'
import KoaJson from 'koa-json'
import statics from 'koa-static'
import helmet from 'koa-helmet'
import compose from 'koa-compose'

moduleAlias(path.resolve(__dirname, '..'))
/* eslint-disable import/first */
import router from '../src/router'

const app = new Koa()

const middleware = compose([
  KoaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 5 * 1024 * 1024
    },
    onError: err => {
      console.error(err)
    }
  }),
  KoaJson(),
  cors(),
  helmet(),
  statics(path.join(__dirname, '..', 'public')),
  router()
])

app.use(middleware)

const BASE_URL: string = 'http://localhost'
const PORT: number = 3000
app.listen(PORT, () => {
  console.log('服务启动成功，正在监听' + PORT + '端口')
  console.log('请访问：', BASE_URL + ':' + PORT + '/YouRestFulAPIs')
})
