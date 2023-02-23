import KoaRouter from "@koa/router";
import userRouter from './user/index'
import systemRouter from './system/index'
const router = new KoaRouter()
const forums = new KoaRouter();
forums.use('/use', userRouter.routes())
forums.use('/system', systemRouter.routes());

export default router.use('/web-api', forums.routes());