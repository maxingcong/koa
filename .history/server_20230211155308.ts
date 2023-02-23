import('module-alias/register')
import "@/tools/env";
import Koa from "koa";
const app = new Koa();
import utils from "@/utils/index";
const port = 3000


// app.env 默认是 NODE_ENV 或 "development"
// app.keys 签名的 cookie 密钥数组
// app.proxy 当真正的代理头字段将被信任时
// 忽略 .subdomains 的 app.subdomainOffset 偏移量，默认为 2
// app.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For
// app.maxIpsCount 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)

app.use(async (ctx: any) => {
    ctx.body = 'Hello World';
});



const ipList = utils.getIpAddress()
// 错误监听器
// app.on('error', () => {
//     console.log('app error');
// })
const errCallback: any = (err: any) => {
    if (err) throw err;
    console.log("********** new Work ************");
    ipList.forEach((v: string) => {
        console.log(v + ':' + port)
    })
}

app.listen(port, errCallback);
