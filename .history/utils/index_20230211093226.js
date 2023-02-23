const os = require('os');

/**
 * 获取当前机器的ip地址
 */
module.exports = {
    getIpAddress() {
        let ifaces = os.networkInterfaces()
        console.log('ifaces', ifaces);
        for (let t in ifaces) {
            let iface = ifaces[t]
            console.log('iface', iface);
            for (let i = 0; i < iface.length; i++) {
                let { family, address, internal } = iface[i]
                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                    return address
                }
            }
        }
    }
}