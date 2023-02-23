
import chalk from 'chalk';
import KoaRouter from "@koa/router";
const fs = require('fs');
const path = require("path");
const os = require('os');
const net = require('net')

/**
 * 获取当前机器的ip地址
 */
export function getIpAddress() {
    let ifaces = os.networkInterfaces()
    let addressList = new Set()
    for (let t in ifaces) {
        let iface = ifaces[t]
        for (let i = 0; i < iface.length; i++) {
            let { family, address, internal } = iface[i]
            if (family === 'IPv4' || family == '4') {
                addressList.add(address)
            }
        }
    }
    return Array.from(addressList)
}

/**
 * 检查端口
 */
export function isPort(port: number | string) {
    // 创建服务并监听该端口
    return new Promise((resolve, reject) => {
        const server = net.createServer().listen(port)
        server.on('listening', function () { // 执行这块代码说明端口未被占用
            server.close() // 关闭服务
            resolve(port)
        })

        server.on('error', function (err: any) {
            if (err.code === 'eaddrinuse') { // 端口已经被使用
                reject('the port【' + port + '】 is occupied, please change other port.')
                return
            }
            reject('端口其他错误：' + err)
        })
    })
}




/******
 * listenInfo 监听信息处理
 * 
 * *********/

export function listenInfo(err?: any): void {
    if (err) throw err;
    const ipList: any[] = getIpAddress()
    console.log(chalk.bgGray.bold('koa+ts running success'));
    console.log(chalk.green('\tRunning success time:'));
    console.log(`\t\t${new Date().toLocaleString()}`);
    const aa = String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")

    switch (aa) {
        case 'development':
            console.log(chalk.green('\tNetwork:'));
            ipList.forEach((ipv4: string) => {
                console.log(`\t\thttp://${ipv4}:${process.env.SERVER_PORT}`)
            })
            break;
        case 'production':
            console.log(chalk.green('\tProduction address:'));
            console.log(`\t\t${process.env.PRODUCTION_ADDRESS}`);
            break;
        default:
            console.error(ipList, String(aa) == 'development');
    }
}


/***********
 * 
 * readdirSyncRouter 读取路由文件信息
 * 
 * ************ */

export function readdirSyncRouter(): any[] {
    const routerList: any[] = [];
    const instance: Record<string, any> = {};
    // console.log(path.resolve('app/route'));//获取绝对路径  'D:\Project\USafe\koa\app\route'
    const routesDir = fs.readdirSync(path.resolve('app/route')).filter((item: string) => item);//[xx,xx,xx] 文件路由目录
    routesDir.forEach((dirPath: string) => {
        if (dirPath.split('.').length < 2) {//忽略手动挂暂文件
            const routesFiles = fs.readdirSync(path.resolve(path.resolve(`app/route/${dirPath}`))).filter((item: string) => item);//获取二级路由
            routesFiles.forEach((filePath: string) => {
                instance[dirPath] = new KoaRouter({ prefix: `/web/api` }); //设置 路由前缀
                instance[dirPath].use(require(path.resolve(`app/route/${dirPath}/${filePath}`)).default.routes());
            });
            routerList.push(instance[dirPath].routes());
            return
        }
    });
    return routerList
}
