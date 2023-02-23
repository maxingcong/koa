import Koa from 'koa'
import KoaCompose from "koa-compose";
import fs from 'fs'
const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    const router: any[] = [];
    // @ts-ignore
    // fs.readdirSync(path.resolve('./app/route')).forEach((filePath) => router.push(require(path.resolve(`./src/router/${filePath}`)).default.routes()));

    // const useCompose = KoaCompose([
    //     ...router,
    // ]);

    // app.use(useCompose);

    app.use(async ctx => {
        console.log(ctx);

        if (ctx.path === '/one' && ctx.method === 'get') {
            ctx.body = 'Hello World';
        } else {
            ctx.status = 404;
            ctx.body = '111111111';
        }
    });


    return app
}

export default createServer