const os = require('os');
const net = require('net')
/**
 * 获取当前机器的ip地址
 */
export default {
    getIpAddress() {
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
    },
    isPort(port: number | string) {
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
                reject('端口其他错误', err)
            })
        })
    }
}