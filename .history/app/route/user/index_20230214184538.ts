import Router from "@koa/router";
import { queryUser } from '@/controller/user'
var userRouter = new Router();

userRouter.get('/user', async (ctx: any, next) => {
    //    await next()
    const data = await queryUser()
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'user' }
    }
});

export default userRouter