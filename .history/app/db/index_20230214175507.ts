import { logHandle } from '@/utils/log'
const mysql = require('mysql')
const { database } = require('../config')


const pool = mysql.createPool({
    host: database.host,
    port: database.port,
    user: database.user,
    password: database.password,
    database: database.database
})


exports.query = function (sql: string, values: any) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err: any, connection: any) {
            if (err) {
                reject(err)
                logHandle(err)
                console.log(err, "数据库连接失败");
                resolve({ code: 500, })
            } else {
                //console.log("数据库连接成功");
                connection.query(sql, values, (err: any, results: any) => {
                    if (err) {
                        reject(err)
                        resolve({ code: 400 })
                    } else {
                        resolve({
                            code: 200,
                            results,
                        })
                        connection.release()// 释放连接池
                    }
                    logHandle(err)
                })
            }
        })
    })
}