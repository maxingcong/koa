import Router from "@koa/router";
import { queryUser, insertUser } from '@/controller/user'
var userRouter = new Router();

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

userRouter.post('/user/create', async (ctx: any, next) => {
    const data = await insertUser({
        user_name: '',
        password: '',
        is_admin: ''
    })
    console.log('data', data);

    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'user' }
    }
});

export default userRouter