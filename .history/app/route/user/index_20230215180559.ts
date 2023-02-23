import Router from "@koa/router";
import { queryUser, insertUser } from '@/controller/user'
var userRouter = new Router();

//示例    start
userRouter.get('/user', async (ctx: any, next) => {
    //    await next()
    const data = await queryUser()
    console.log('data', data);

    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'user' }
    }
});
/*********  end ************* */

userRouter.post('/user/create', async (ctx: any, next) => {
    const data = await insertUser(ctx.request.body)
    // console.log('data', ctx.request.body);
    ctx.body = data
});

export default userRouter