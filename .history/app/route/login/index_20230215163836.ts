import Router from "@koa/router";
import { queryUser } from '@/controller/login'
var systemRouter = new Router();

systemRouter.post('/login', async (ctx: any) => {
    const { username, password } = ctx.request.body;
    const params: any = await queryUser(username)
    const data = {
        code: 0,
        msg: '',
        data: {}
    }
    if (!params.results.length) {
        data.msg = '账号信息不存在'
        data.code = -1
        ctx.body = data
        return
    }
    const results = params.results && params.results[0] || {}
    // console.log('results', results);
    if (results.password !== password) {
        data.msg = '密码错误'
        data.code = -1
    } else {
        const { user_name, is_admin } = results
        data.data = {
            username: user_name,
            isAdmin: is_admin
        }
    }
    ctx.body = data
});

export default systemRouter