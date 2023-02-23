/*********************手动配置路由设置  start**********************/
import KoaRouter from "@koa/router";
import userRouter from './user/index'
import systemRouter from './system/index'

const router = new KoaRouter()
const forums = new KoaRouter();
forums.use('/use', userRouter.routes())  //手动挂载需要
forums.use('/system', systemRouter.routes());
router.prefix('/web/api')//设置路由前缀


export default router.use('', forums.routes());

/*********************手动配置路由设置  end**********************/
