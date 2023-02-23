// import forums from './route'
import KoaCompose from "koa-compose";
import Koa from 'koa'
import { logger, httpLogger } from '@/utils/log'
import { readdirSyncRouter } from '@/utils/index'

global.logger = logger;
const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    // x-response-time
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });

    //路由挂载的 1、可以手动添加
    // app.use(forums.routes()).use(forums.allowedMethods())
    // 自动读取文件


    const setup = KoaCompose([...readdirSyncRouter()])
    app.use(setup)
    app.use(httpLogger) // logger 

    return app
}

export default createServer