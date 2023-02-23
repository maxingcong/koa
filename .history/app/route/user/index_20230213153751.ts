import Router from "@koa/router";
var userRouter = new Router();

userRouter.get('/', (ctx: any) => {
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'user' }
    }
});

export default userRouter