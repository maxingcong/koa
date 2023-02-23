import type {
    Context,
} from "koa";
import type {
    Dayjs
} from "dayjs";
import type {
    Logger
} from "log4js";

export interface KoaContext extends Context {
    utils: {
        dayjs: <T = Dayjs>(date: string | number | Date | null | undefined) => T,
        log4js: Logger
    }
}

interface global { logger: any }
declare global {
    var logger: any;
    var pool: any
}
