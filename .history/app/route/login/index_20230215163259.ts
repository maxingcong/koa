import Router from "@koa/router";
import { queryUser } from '@/controller/login'
var systemRouter = new Router();

systemRouter.post('/login', async (ctx: any) => {
    const { username, password } = ctx.request.body;
    const params: any = await queryUser(username)
    const data = {
        code: 200,
        body: {
            msg: '',
            data: {}
        }
    }
    if (!params.results.length) {
        data.body.msg = '账号信息不存在'
        data.code = -1
    }
    const results = params.results && params.results[0] || {}
    // console.log('results', results);
    if (results.password !== password) {
        data.body.msg = '密码错误'
        data.code = -1
    } else {
        const { user_name, is_admin } = results
        data.body.data = {
            username: user_name,
            isAdmin: is_admin
        }
    }


    ctx.body = data
});

export default systemRouter