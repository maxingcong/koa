// import log4js from "log4js";

// // https://log4js-node.github.io/log4js-node/api.html
// const env = String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")
// const logs: any = log4js.getLogger();//log4js.getLogger([category]) 允许接收一个字符串，表示使用category类型，如果不传参，或者找不到对应的category，将会使用默认配置即default。
// logs.level = env == 'development' ? "debug" : ''; // levels(optional, object) - 用于定义自定义日志级别 
// // ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
// logs.pm2 = true // 如果您使用pm2运行您的应用程序，请将此设置为 true ，否则日志将不起作用

// log4js.configure({
//     appenders: {//appenders定义日志输出形式  log4js支持多种输出形式，打印到控制台、输出到文件，传输到服务器，也可以以邮件形式发送日志。
//         //categoryFilter、console、dateFile、file、fileSync、logLevelFilter、multiFile、multiprocess、recording、stderr、stdout、tcp、tcp-server
//         // 支持但需要额外插件的形式：
//         // gelf、hipchat、logFaces-HTTP、logFaces-UDP、loggly、logstashHTTP、logstashUDP、mailgun、rabbitmq、redis、slack、smtp
//         infoLogs: {
//             type: 'dateFile',//dateFile（以日期划分日志文件） file（以文件大小划分日志文件）
//             filename: 'logs/',
//             backups: 5,  // 仅保留最新的五个日志文件
//             pattern: ".yyyy-MM-dd", // 用于确定何时滚动日志的模式
//             alwaysIncludePattern: true,
//             compress: true    //  超过maxLogSize,压缩代码
//         }

//         // console将日志输出到控制台，需要注意的一点是，大量日志写入控制台可能会使应用占用大量内存，可以考虑使用stdout。
//         // appenders: { console: { type: 'console' } },
//         //  categories: { default: { appenders: [ 'console' ], level: 'info' } }

//         // logLevelFilter  日志过滤器，当需要在一堆日志中特殊处理某特定级别日志时 官方示例如下：
//         // appenders: {
//         //         everything: {            
//         //            type: 'file',
//         //            filename: 'all-the-logs.log'
//         //         },
//         //         emergencies: {
//         //             type: 'file',
//         //             filename: 'panic-now.log'
//         //         },
//         //         just-errors: { //just-errors ’会过滤得到ERROR以上级别的日志，并使用emergencies appender，单独将错误日志记录到panic-now.log文件中。
//         //             type: 'logLevelFilter',
//         //             appender: 'emergencies',
//         //             level: 'error'
//         //       }
//         //  } 
//         // categories: {
//         //     default: { appenders: ['just-errors', 'everything' ], level: 'debug' }
//         //   }

//         // layout可以用来自定义日志的输出格式，参见layouts。
//         //   appenders: {
//         //             infoLogs: {
//         //                 type: 'file',
//         //                 filename: 'logs/info/file.log',
//         //                 maxLogSize: 10485760, // 10mb,日志文件大小,超过该size则自动创建新的日志文件
//         //                 backups: 20,  // 仅保留最新的20个日志文件
//         //                 compress: true    //  超过maxLogSize,压缩代码
//         //             },
//         //             errorLogs: {
//         //                 type: 'file',
//         //                 filename: 'logs/error/file.log',
//         //                 maxLogSize: 10485760,
//         //                 backups: 20,
//         //                 compress: true
//         //             },
//         //             justErrors: {
//         //                 type: 'logLevelFilter', // 过滤指定level的文件
//         //                 appender: 'errorLogs',  // appender
//         //                 level: 'error'  // 过滤得到error以上的
//         //             },
//         //             console: {type: 'console'}
//         // }
//         // categories: {

//         //             default: { appenders: ['console', 'justErrors', 'infoLogs'], level: 'info' },

//         //             err: { appenders: ['errorLogs'], level: 'error' },

//         //         }
//     },
//     categories: {//categories定义了日志输出类别，
//         default: { appenders: ["infoLogs"], level: "all" },//当指定level为INFO时，只允许输出INFO级别以上的日志，WARN、ERROR都会被记录，但是TRACE和DEBUG不会。这也就是为什么，手动输出的三条日志，只打印两条的原因。
//     },
// });

// export const logger = logs

// const httpLog = log4js.getLogger('http');

// export const httpLogger = log4js.connectLogger(httpLog, { level: 'ALL' });


import log4js from "log4js";

const env = String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")
const logs: any = log4js.getLogger();
logs.level = env == 'development' ? "debug" : '';
// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
logs.pm2 = true // 如果您使用pm2运行您的应用程序，请将此设置为 true ，否则日志将不起作用

log4js.configure({
    appenders: {
        out: { type: 'console' },
        //categoryFilter、console、dateFile、file、fileSync、logLevelFilter、multiFile、multiprocess、recording、stderr、stdout、tcp、tcp-server
        allLog: {
            type: 'file',//dateFile（以日期划分日志文件） file（以文件大小划分日志文件）
            filename: 'logs/all',
            backups: 20,  // 仅保留最新的五个日志文件
            pattern: ".yyyy-MM-dd", // 用于确定何时滚动日志的模式
            alwaysIncludePattern: true,
            compress: true,   //  超过maxLogSize,压缩代码
            keepFileExt: true,
            maxLogSize: 10485760,
        },
        httpLog: { type: "file", filename: "log/http/Access.log", pattern: ".yyyy-MM-dd", keepFileExt: true },
        errorLog: { type: 'file', filename: './log//error/error.log', pattern: ".yyyy-MM-dd", keepFileExt: true },
        error: { type: "logLevelFilter", level: "error", appender: 'errorLog' }
    },
    categories: {//categories定义了日志输出类别，
        http: { appenders: ['out', 'httpLog'], level: "all" },
        default: { appenders: ['out', 'allLog', 'error'], level: "all" },
    },
});

export const logger = log4js.getLogger("liveMeeting");

const httpLog = log4js.getLogger('http');

export const httpLogger = log4js.connectLogger(httpLog, { level: 'all' });
