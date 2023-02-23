import Router from "@koa/router";
var systemRouter = new Router();

systemRouter.get('/user', (ctx: any) => {
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: '1' }
    }
});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

export default systemRouter