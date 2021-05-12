import Router from '@koa/router'

const router = new Router()

router.prefix('/user')

router.get('/login', ctx => {
  ctx.body = 'login'
})

export default router