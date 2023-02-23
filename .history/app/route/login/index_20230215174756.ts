import Router from "@koa/router";
import { queryUser } from '@/controller/login'
var systemRouter = new Router();

systemRouter.post('/login', async (ctx: any) => {

    ctx.body = await queryUser(ctx)
});

export default systemRouter