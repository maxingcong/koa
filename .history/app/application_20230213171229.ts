// import KoaCompose from "koa-compose";
// import fs from 'fs'
// import path from "path";
import Koa from 'koa'
import forums from './route'

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    // const router: any[] = [];
    // console.log(path.resolve('app/route'));//获取绝对路径  'D:\Project\USafe\koa\app\route'
    // console.log(forums.routes());

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


    app.use(forums.routes()).use(forums.allowedMethods())

    return app
}

export default createServer