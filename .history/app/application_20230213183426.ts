import KoaCompose from "koa-compose";
import KoaRouter from "@koa/router";
import fs from 'fs'
import path from "path";
import Koa from 'koa'
import my_logs from '@/utils/log'
// import forums from './route'

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
    // app.use(async (ctx, next) => {
    //     const start = Date.now();
    //     await next();
    //     const ms = Date.now() - start;
    //     console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    // });
    app.use(my_logs())

    //路由挂载的 1、可以手动添加
    // app.use(forums.routes()).use(forums.allowedMethods())
    // 自动读取文件
    const routerList: any[] = [];
    const instance: Record<string, any> = {};
    // console.log(path.resolve('app/route'));//获取绝对路径  'D:\Project\USafe\koa\app\route'
    const routesDir = fs.readdirSync(path.resolve('app/route')).filter((item: string) => item);//[xx,xx,xx] 文件路由目录
    routesDir.forEach((dirPath: string) => {
        if (dirPath.split('.').length < 2) {//忽略手动挂暂文件
            const routesFiles = fs.readdirSync(path.resolve(path.resolve(`app/route/${dirPath}`))).filter((item: string) => item);//获取二级路由
            routesFiles.forEach((filePath: string) => {
                instance[dirPath] = new KoaRouter({ prefix: `/web/api` }); //设置 路由前缀
                instance[dirPath].use(require(path.resolve(`app/route/${dirPath}/${filePath}`)).default.routes());
            });
            routerList.push(instance[dirPath].routes());
            return
        }
    });
    const setup = KoaCompose([...routerList])
    app.use(setup)

    return app
}

export default createServer