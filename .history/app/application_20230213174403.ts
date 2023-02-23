import KoaCompose from "koa-compose";
import KoaRouter from "@koa/router";
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

    // console.log(path.resolve('app/route'));//获取绝对路径  'D:\Project\USafe\koa\app\route'


    const routerList: any[] = [];
    const instance: Record<string, any> = {};
    const routesDir = fs.readdirSync(path.resolve('app/route')).filter((item: string) => item);//[xx,xx,xx] 文件路由目录
    console.log(fs.readdirSync(path.resolve('app/route')));

    routesDir.forEach((dirPath: string) => {
        console.log(dirPath.split('.').length);

        if (dirPath.split('.').length > 2) {
            instance[dirPath] = new KoaRouter({ prefix: `/${dirPath}` }); //设置 路由前缀
            const routesFiles = fs.readdirSync(path.resolve(path.resolve(`app/route/${dirPath}`))).filter((item: string) => item);//获取二级路由
            routesFiles.forEach((filePath: string) => {
                instance[dirPath].use(require(path.resolve(`app/route/${dirPath}/${filePath}`)).default.routes());
            });

            routerList.push(instance[dirPath].routes());
            return
        }
        console.log(require(path.resolve(`app/route/${dirPath}`)).default.routes());

        // instance[dirPath].use(require(path.resolve(`app/route/${dirPath}`)).default.routes());
        routerList.push(instance[dirPath].routes());
    });
    console.log(routerList);



    return app
}

export default createServer