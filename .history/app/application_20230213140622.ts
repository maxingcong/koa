import Koa from 'koa'
import KoaCompose from "koa-compose";
import fs from 'fs'
import path from "path";
import forums from './route'

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    const router: any[] = [];
    // @ts-ignore
    // const route = fs.readdirSync(path.resolve('./route/index.ts'))
    console.log(forums);

    // .forEach((filePath) => router.push(require(path.resolve(`./src/router/${filePath}`)).default.routes()));

    // const useCompose = KoaCompose([
    //     ...forums,
    // ]);

    console.log(useCompose);

    // app.use(useCompose);




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



    app.use(ctx => {
        console.log(ctx);
        if (ctx.path === '/') {
            ctx.status = 200;//正常响应状态
            ctx.body = '111111111';
        }
    });

    return app
}

export default createServer