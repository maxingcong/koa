import log4js from "log4js";
import dayjs from "dayjs";

import type {
    Context,
    Next
} from "koa";

// log4js.configure({
//     /**
//   * 指定要记录的日志分类 cheese
//   * 展示方式为文件类型 file
//   * 日志输出的文件名 cheese.log
//   */
//     appenders: {
//         everything: { type: 'file', filename: `logs/${dayjs(Date.now()).format('YYYY/MM/DD')}.log` }
//     },
//     /**
//    * 指定日志的默认配置项
//    * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
//    * 指定 cheese 日志的记录内容为 error 及 error 以上级别的信息
//    */
//     categories: { default: { appenders: ['cheese'], level: 'error' } }
// });

export default (options?: any) => {
    return async (ctx: Context, next: any) => {
        const start = Date.now()
        // log4js.configure({
        //     /**
        //   * 指定要记录的日志分类 cheese
        //   * 展示方式为文件类型 file
        //   * 日志输出的文件名 cheese.log
        //   */
        //     appenders: {
        //         everything: { type: 'file', filename: `app/logs/${dayjs(Date.now()).format('YYYY_MM_DD')}.log` }
        //         // everything: { type: 'file', filename: `cheese.log` }
        //     },
        //     /**
        //    * 指定日志的默认配置项
        //    * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
        //    * 指定 cheese 日志的记录内容为 error 及 error 以上级别的信息
        //    */
        //     categories: { default: { appenders: ['cheese'], level: 'error' } }
        // });
        const logger = log4js.getLogger('example');
        await next() //
        const end = Date.now()
        const responseTime = end - start;
        logger.info(`响应时间为${responseTime / 1000}s`);
    }
}
