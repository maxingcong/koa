import Router from "@koa/router";
var systemRouter = new Router();

systemRouter.get('/system', (ctx: any) => {
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'system' }
    }
});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

export default systemRouter