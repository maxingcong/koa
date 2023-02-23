import Router from "@koa/router";
import { queryUser } from '@/controller/login'
var systemRouter = new Router();

systemRouter.post('/login', async (ctx: any) => {
    const { username, password } = ctx.request.body;
    const params: any = await queryUser(username)
    const results = params.results && params.results[0] || {}

    console.log('results', results.password);



    ctx.body = {
        code: 200,
        message: "success",
        data: { code: 'login' }
    }
});

export default systemRouter