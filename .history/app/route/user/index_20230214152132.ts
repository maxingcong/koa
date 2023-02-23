import Router from "@koa/router";
var userRouter = new Router();

userRouter.get('/user', (ctx: any) => {
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'user' }
    }
});

export default userRouter