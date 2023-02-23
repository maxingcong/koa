import Router from "@koa/router";
var systemRouter = new Router();

systemRouter.post('/login', (ctx: any) => {
    console.log(ctx.request);
    // let post_data = ''
    // ctx.req.addListener('data', (postDataChunk: any) => {
    //     console.log('收到post数据 ---->', postDataChunk)
    // })
    // ctx.req.addListener('end', () => {
    //     console.log('接收post数据完毕 ---->', post_data)
    // })

    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'login' }
    }
});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

export default systemRouter