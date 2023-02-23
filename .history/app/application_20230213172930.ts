import KoaCompose from "koa-compose";
import fs from 'fs'
import path from "path";
import Koa from 'koa'
import forums from './route'

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()

    // x-response-time
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });

    // logger
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    });

    //路由挂载的 1、可以手动添加
    app.use(forums.routes()).use(forums.allowedMethods())
    // 自动读取文件
    const instance: Record<string, any> = {};
    const routesDir = fs.readdirSync(path.resolve('app/route')).filter((item: string) => item.indexOf('v') >= 0);




    // const router: any[] = [];
    // console.log(path.resolve('app/route'));//获取绝对路径  'D:\Project\USafe\koa\app\route'
    // console.log(forums.routes());


    return app
}

export default createServer