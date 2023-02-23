import Router from "@koa/router";
import { queryUser } from '@/controller/login'
var loginRouter = new Router();

loginRouter.post('/login', async (ctx: any) => {
    ctx.body = await queryUser(ctx.request.body)
});

export default loginRouter