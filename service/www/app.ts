import moduleAlias from 'module-alias'
import path from 'path'
import Koa from 'koa'

import compose from 'koa-compose'
import router from '../src/router'
moduleAlias(path.resolve(__dirname, '..'))

const app = new Koa()

const middleware = compose([router()])

app.use(middleware)

const BASE_URL: string = 'http://localhost'
const PORT: number = 3000
app.listen(PORT, () => {
  console.log('服务启动成功，正在监听' + PORT + '端口')
  console.log('请访问：', BASE_URL, ':', PORT)
})
