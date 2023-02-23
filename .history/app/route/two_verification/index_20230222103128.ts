import Router from "@koa/router";
import { queryUser } from '@/controller/login'
var two_verification = new Router();

two_verification.post('/two_verification', async (ctx: any) => {
    ctx.body = await queryUser(ctx.request.body)
});

export default two_verification