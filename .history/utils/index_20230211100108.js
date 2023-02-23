const os = require('os');
const net = require('net')
/**
 * 获取当前机器的ip地址
 */
module.exports = {
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
    isPort(port) {
        // 创建服务并监听该端口
        return new Promise((resolve, reject) => {
            var server = net.createserver().listen(port)
            server.on('listening', function () { // 执行这块代码说明端口未被占用
                server.close() // 关闭服务
                resolve(port)
            })

            server.on('error', function (err) {
                if (err.code === 'eaddrinuse') { // 端口已经被使用
                    console.log('the port【' + port + '】 is occupied, please change other port.')
                    reject()
                }
            })
        })
    }
}