import query from '../db/user/query'
import { insert } from '../db/base'

interface UserList {
    page: number
    pageSize: number
    total: number
}

//查询单条详情    分页查询   总条数   
export const queryUser = async (id?: number | string, page?: number | string, pageSize?: number | string) => {
    if (id) return await query(`select * from t_user where id='${id}'`)
    const total: any = await query(`select count(id) from t_user`)
    return await {
        total
    }
}


//创建角色
export const insertUser = async (params: {
    username: string,
    intPassword: string,
    role: string,
}) => {
    const { username,
        intPassword,
        role
    } = params

    const data = {
        code: 0,
        msg: '',
        data: {}
    }
    const results = await insert(`insert into t_user (user_name,password,is_admin,role) values (${username},${intPassword},0,"${role}")`)
    console.log(results);
}