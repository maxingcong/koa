// import forums from './route'
import KoaCompose from "koa-compose";
import Koa from 'koa'
import {
    logInfo,
    logResponse,
    logError,
} from '@/utils/log'
import { readdirSyncRouter } from '@/utils/index'

global.logger = logInfo;

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    // x-response-time
    app.use(async (ctx, next) => {
        const start = Date.now();
        try {
            if (String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "") == 'development') {
                logInfo(ctx)//所有请求日志
            }
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
            logResponse(ctx, `${ms}ms`);//响应日志
        } catch (error) {
            const ms = Date.now() - start;
            logError(ctx, error, ms);//记录异常日志
        }
    });

    //路由挂载的 1、可以手动添加
    // app.use(forums.routes()).use(forums.allowedMethods())
    // 自动读取文件
    const setup = KoaCompose([...readdirSyncRouter()])
    app.use(setup)

    return app
}

export default createServer