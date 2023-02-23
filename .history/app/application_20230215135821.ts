// import forums from './route'
import KoaCompose from "koa-compose";
import pool from '@/db'
import Koa from 'koa'
import {
    logInfo,
    logResponse,
    logError,
} from '@/utils/log'
import { readdirSyncRouter } from '@/utils/index'
const BodyParser = require('koa-bodyparser')// https://github.com/koajs/bodyparser/tree/2.x
// const bodyparser = new BodyParser();
global.logger = logInfo;
global.pool = pool;

const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    app.use(BodyParser({
        extendTypes: {//解析器只会在请求类型命中 enableTypes 时解析
            json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
        },
        onerror: function (err: any, ctx: any) {
            // ctx.throw('body parse error', 422);
            ctx.body = { code: -1, msg: '解析失败' }
        }
    }))

    app.on('error', (err, ctx) => {
        console.error('server error', err)
        logError(ctx, err, Date.now());//记录异常日志       
    });
    // x-response-time
    app.use(async (ctx, next) => {
        const start = Date.now();
        // console.log('ctx-ctx', ctx);

        try {
            if (String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "") == 'development') logInfo(ctx)//所有请求日志
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
            logResponse(ctx, `${ms}ms`);//响应日志
        } catch (error) {
            const ms = Date.now() - start;
            logError(ctx, error, ms);//记录异常日志
            console.log(error);
            ctx.body = { code: -1, body: { meg: "服务发生异常" } }
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