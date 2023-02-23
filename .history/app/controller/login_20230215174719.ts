import query from '../db/user/query'

//查询单条详情 
export const queryUser = async (ctx: any) => {
    // if (id) return await query(`select * from t_user where id='${id}'`)
    const { username, password } = ctx.request.body;
    const data = {
        code: 0,
        msg: '',
        data: {}
    }
    if (!username) {
        data.msg = '账号信息不存在'
        data.code = -1
        return data
    }

    const params: any = await query(`select * from t_user where user_name='${username}'`)
    const results = params.results && params.results[0] || {}
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
    return data
}