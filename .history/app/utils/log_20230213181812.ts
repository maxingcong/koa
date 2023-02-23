import log4js from "log4js";
import dayjs from "dayjs";

import type {
    Context,
    Next
} from "koa";

log4js.configure({
    appenders: {
        everything: { type: 'file', filename: `logs/${dayjs(Date.now()).format('YYYY/MM/DD')}.log` }
    },
    categories: {
        default: { appenders: ['everything'], level: 'info' }
    }
});

export default async (ctx: Context, next: Next) => {
    ctx.utils = {
        dayjs,
        log4js: log4js.getLogger(),
    }
    await next()
}
