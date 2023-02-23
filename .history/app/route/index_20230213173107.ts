import KoaRouter from "@koa/router";
import userRouter from './user/index'
import systemRouter from './system/index'
import fs from 'fs'
import path from "path";

const router = new KoaRouter()
const forums = new KoaRouter();
forums.use('/use', userRouter.routes())
forums.use('/system', systemRouter.routes());
router.prefix('/web/api')//设置路由前缀


export default router.use('', forums.routes());