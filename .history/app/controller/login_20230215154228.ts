import query from '../db/user/query'

//查询单条详情 
export const queryUser = async (name: string) => {
    // if (id) return await query(`select * from t_user where id='${id}'`)
    if (name) return await query(`select * from t_user where user_name='${name}'`)
    return await { code: -1 }
}