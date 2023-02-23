import Router from "@koa/router";
import { queryUser, insertUser, queryList } from '@/controller/user'
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

//创建用户
userRouter.post('/user/create', async (ctx: any, next) => {
    const data = await insertUser(ctx.request.body)
    console.log('data', data);
    ctx.body = data
});

//查询列表
userRouter.get('/user/list', async (ctx: any, next) => {
    console.log(ctx.request);

    const data = await queryList(ctx.request)
    console.log('data', data);
    ctx.body = data
});

export default userRouter