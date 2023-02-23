import Router from "@koa/router";
import { Google_verification } from '@/controller/two_verification'
var two_verification = new Router();

two_verification.post('/two_verification', async (ctx: any) => {
    ctx.body = await Google_verification(ctx.request.body)
});

export default two_verification