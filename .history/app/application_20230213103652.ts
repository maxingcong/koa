import Koa from 'koa'
import KoaCompose from "koa-compose";
import fs from 'fs'
import path from "path";

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    const router: any[] = [];
    // @ts-ignore
    const route = fs.readdirSync(path.resolve('./app/route/index'))
    console.log(route);

    // .forEach((filePath) => router.push(require(path.resolve(`./src/router/${filePath}`)).default.routes()));

    const useCompose = KoaCompose([
        ...router,
    ]);

    console.log(useCompose);

    // app.use(useCompose);

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