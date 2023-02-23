import query from '../db/user/query'

interface UserList {
    page: number
    pageSize: number
    total: number
}

//查询单条详情 
export const queryUser = async (id?: number | string, page?: number | string, pageSize?: number | string) => {
    if (id) return await query(`select * from t_user where id='${id}'`)
    return await { code: -1 }
}