const os = require('os');

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
    }
}