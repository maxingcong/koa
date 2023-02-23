import Koa from 'koa'
import KoaCompose from "koa-compose";
import fs from 'fs'
import path from "path";
import forums from './route'

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    // const router: any[] = [];
    // console.log(path.resolve('app/route'));//获取绝对路径  'D:\Project\USafe\koa\app\route'
    // console.log(forums.routes());

    // @ts-ignore
    // const route = fs.readdirSync(path.resolve('app/route'))
    const route = fs.readdirSync(path.resolve('app/route')).forEach((filePath: any) => {
        console.log(filePath.default.routes());
        // return filePath.default.routes()
    });
    console.log(forums);
    // const useCompose = KoaCompose([
    //     ...route,
    //   ]);
    // .forEach((filePath) => router.push(require(path.resolve(`./src/router/${filePath}`)).default.routes()));

    // const useCompose = KoaCompose([
    //     ...forums,
    // ]);

    // console.log(useCompose);

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


    // app.use(forums.routes()).use(forums.allowedMethods())

    return app
}

export default createServer