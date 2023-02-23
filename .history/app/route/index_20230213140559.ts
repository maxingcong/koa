import KoaRouter from "@koa/router";
import userRouter from './user/index'
import systemRouter from './system/index'

var forums = new KoaRouter();

// router.get('/', (ctx: any) => {
//     ctx.body = {
//         code: 200,
//         message: "success",
//         data: { code: '1' }
//     }
// });
forums.use('/', userRouter.routes(), systemRouter.routes());

export default forums;