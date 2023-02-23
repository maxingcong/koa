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
const path = require('path')
//日志根目录
var baseLogPath = path.resolve(__dirname, '/logS')
/*报错输出日志*/
//错误日志目录、文件名、输出完整路径
var errorPath = "/error";
var errorFileName = "error";
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

/*请求数据得到响应时输出响应日志*/
//响应日志目录、文件名、输出完整路径
var responsePath = "/response";
var responseFileName = "response";
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

/*操作数据库进行增删改等敏感操作记录日志*/
//操作日志目录、文件名、输出完整路径
var handlePath = "/handle";
var handleFileName = "handle";
var handleLogPath = baseLogPath + handlePath + "/" + handleFileName;


const env = String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")
const logs: any = log4js.getLogger();
logs.level = env == 'development' ? "debug" : '';
// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
logs.pm2 = true // 如果您使用pm2运行您的应用程序，请将此设置为 true ，否则日志将不起作用

log4js.configure({
    appenders: {
        "rule-console": { "type": "console" },
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": errorPath
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": responsePath
        },
        "handleLogger": {
            "type": "dateFile",
            "filename": handleLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": responsePath
        },
    },
    categories: {//categories定义了日志输出类别，
        "default": { "appenders": ["rule-console"], "level": "all" },
        "resLogger": { "appenders": ["resLogger"], "level": "info" },
        "errorLogger": { "appenders": ["errorLogger"], "level": "error" },
        "handleLogger": { "appenders": ["handleLogger"], "level": "all" },
        "http": { "appenders": ["resLogger"], "level": "info" }
    },
});


//调用预先定义的日志名称
const resLogger = log4js.getLogger("resLogger");
const errorLogger = log4js.getLogger("errorLogger");
const handleLogger = log4js.getLogger("handleLogger");
const consoleLogger = log4js.getLogger();

const formatText = {
    info: function (info: any) {
        let logText = new String();
        logText += "\n" + "***************info log start ***************" + "\n"; //响应日志头信息
        logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";        //响应内容
        logText += "*************** info log end ***************" + "\n";        //响应日志结束信息
        return logText;
    },
    request: function (req: any, resTime: any) {
        let logText: any = new String();
        let method = req.method;
        logText += "访问方法 request method: " + method + "\n";        //访问方法
        logText += "request originalUrl:  " + req.originalUrl + "\n";  //请求原始地址
        logText += "request client ip:  " + req.ip + "\n";       //客户端ip
        let startTime;        //开始时间
        if (method === 'GET') {      //请求参数
            logText += "request query:  " + JSON.stringify(req.query) + "\n";
        } else {
            logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        }
        logText += "服务器响应时间 response time: " + resTime + "\n";//服务器响应时间
        return logText;
    },
    response: function (ctx: any, resTime: any) {
        let logText = new String();
        logText += "\n" + "*************** response log start 响应日志开始***************" + "\n"; //响应日志开始
        logText += formatText.request(ctx.request, resTime);//添加请求日志
        logText += "response status: " + ctx.status + "\n"; //响应状态码
        logText += "响应内容 response body: " + "\n" + JSON.stringify(ctx.body) + "\n";    //响应内容
        logText += "*************** response log end ***************" + "\n";        //响应日志结束
        return logText;
    },
    handle: function (info: any) {
        let logText = new String();
        logText += "\n" + "***************        //响应日志开始 info log start ***************" + "\n";        //响应日志开始
        logText += "handle info detail: " + "\n" + JSON.stringify(info).replace(/\\n/g, "\n") + "\n";        //响应内容
        logText += "***************     //响应日志结束 info log end ***************" + "\n";     //响应日志结束
        return logText;
    },
    error: function (ctx: any, err: any, resTime: any) {
        let logText = new String();
        logText += "\n" + "*************** error log start ***************" + "\n";    //错误信息开始
        logText += formatText.request(ctx.request, resTime);        //添加请求日志
        logText += "err name: " + err.name + "\n";       //错误名称
        logText += "err message: " + err.message + "\n";    //错误信息
        logText += "err stack: " + err.stack + "\n";   //错误详情
        logText += "*************** error log end ***************" + "\n";        //错误信息结束
        return logText;
    }
}

export const logInfo = (info: any) => {    //封装普通日志
    if (info) {
        consoleLogger.info(formatText.info(info));
    }
}
export const logRespons = function (ctx: any, resTime: any) {    //封装响应日志
    if (ctx) {
        resLogger.info(formatText.response(ctx, resTime));
    }
}
export const logHandle = function (res: any) {    //封装操作日志
    if (res) {
        handleLogger.info(formatText.handle(res));
    }
}

export const logError = function (ctx: any, error: any, resTime: any) {//封装错误日志
    if (ctx && error) {
        errorLogger.error(formatText.error(ctx, error, resTime));
    }
}