const Koa = require('koa');
const app = new Koa();
const utils = require("./utils/index")
console.log(utils.getIpAddress);
// app.env 默认是 NODE_ENV 或 "development"
// app.keys 签名的 cookie 密钥数组
// app.proxy 当真正的代理头字段将被信任时
// 忽略 .subdomains 的 app.subdomainOffset 偏移量，默认为 2
// app.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For
// app.maxIpsCount 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)

app.use(async ctx => {
    ctx.body = 'Hello World';
});
console.log('process.env', process.env)


app.listen(3000);
console.log(utils.getIpAddress(), 3000)