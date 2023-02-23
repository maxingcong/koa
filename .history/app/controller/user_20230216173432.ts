import query from '../db/user/query'
import { insert } from '../db/base'
const dayjs = require('dayjs')

interface UserList {
    page: number
    pageSize: number
    total: number
}
const baseDate = JSON.stringify({
    code: 0,
    msg: '',
    data: {}
})

//查询单条详情     总条数   
export const queryUser = async (id?: number | string) => {
    if (id) return await query(`select * from t_user where id='${id}'`)
    const rows: any = await query(`select count(id) from t_user`)
    return rows
}


//创建角色
export const insertUser = async (params: {
    username: string,
    intPassword: string,
    role: string,
    phone?: string
}) => {
    const { username,
        intPassword,
        role,
        phone
    } = params

    const data = JSON.parse(baseDate)
    const rows = await query(`select * from t_user where user_name='${username}' or phone='${phone}'`)
    if (rows.code !== 200) {
        data.code = -1
        data.msg = '创建失败'
        return data
    }
    let repeatName = false
    if (rows.results.some((v: any) => {
        if (v.user_name == username) {
            repeatName = true
            return true
        } else if (v.phone == phone) {

            return true
        }
    })) {
        data.code = -1
        data.msg = repeatName ? '当前用户名重复' : '当前电话号码已注册'
        return data
    }

    const { code } = await insert(`insert into t_user 
    ( user_name,
    password,
    is_admin,
    role,
    phone,
    create_time) values
     ('${username}',
     '${intPassword}',
     0,
     "${role}",
     ${phone},
     "${dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss')}"
     )`)

    if (code !== 200) {
        data.code = -1
        data.msg = '创建失败'
    }
    return data
}


//分页查询   总条数   
export const queryList = async (search: any) => {
    const { page = 1, pageSize = 10 }: { page: number | string, pageSize: number | string } = search

    const rows: any = await query(`select * from t_user limit ${((+page) - 1) * (+pageSize)}, ${pageSize}`)
    const data = JSON.parse(baseDate)
    if (rows.code !== 200) {
        data.code = -1
        data.msg = '查询失败'
        return data
    }
    data.data = data.results
    const rowsTotal = await queryUser()
    if (rowsTotal.code !== 200) {
        data.code = -1
        data.msg = '查询失败'
        return data
    }
    data.total = rowsTotal.results
    return data
}