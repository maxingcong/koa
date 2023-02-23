import KoaRouter from "@koa/router";
import userRouter from './user/index'
import systemRouter from './system/index'

var forums = new KoaRouter();

forums.use('/', userRouter.routes(), systemRouter.routes());

export default forums;