import Router from "@koa/router";
var userRouter = new Router();

userRouter.get('/user', (ctx: any) => {
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: '1' }
    }
});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

export default userRouter