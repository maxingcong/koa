const Koa = require('koa');
const app = new Koa();
const utils = require("./utils/index")
const port = 3000
// app.env 默认是 NODE_ENV 或 "development"
// app.keys 签名的 cookie 密钥数组
// app.proxy 当真正的代理头字段将被信任时
// 忽略 .subdomains 的 app.subdomainOffset 偏移量，默认为 2
// app.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For
// app.maxIpsCount 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)

app.use(async ctx => {
    ctx.body = 'Hello World';
});

// console.log(process.env)
const ipList = utils.getIpAddress()

// utils.isPort(port).then((res) => {
//     console.log('res', res);
//     console.log("********快速访问链接******")
//     ipList.forEach((v) => {
//         console.log(v + ':' + port)
//     })

// }).catch(err => {
//     console.log(err)
// })
const aa = async function bb() {
    const cc = await utils.isPort(3000)
    console.log(cc);
}
aa()
// app.listen(port);

