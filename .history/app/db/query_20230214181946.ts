import { logHandle } from '@/utils/log'

exports.query = function (sql: string, values: any) {
    return new Promise((resolve, reject) => {
        console.log('pool', pool);

        pool.getConnection(function (err: any, connection: any) {
            if (err) {
                reject(err)
                logHandle(err)
                console.log(err, "数据库连接失败");
                resolve({ code: 500, })
            } else {
                console.log("数据库连接成功", connection);
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