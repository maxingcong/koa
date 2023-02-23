import log4js from "log4js";

// https://log4js-node.github.io/log4js-node/api.html
const env = String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")
const logs: any = log4js.getLogger();//log4js.getLogger([category]) 允许接收一个字符串，表示使用category类型，如果不传参，或者找不到对应的category，将会使用默认配置即default。
logs.level = env == 'development' ? "debug" : ''; // levels(optional, object) - 用于定义自定义日志级别 
// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
logs.pm2 = true // 如果您使用pm2运行您的应用程序，请将此设置为 true ，否则日志将不起作用

log4js.configure({
    appenders: {//appenders定义日志输出形式  log4js支持多种输出形式，打印到控制台、输出到文件，传输到服务器，也可以以邮件形式发送日志。
        //categoryFilter、console、dateFile、file、fileSync、logLevelFilter、multiFile、multiprocess、recording、stderr、stdout、tcp、tcp-server
        // 支持但需要额外插件的形式：
        // gelf、hipchat、logFaces-HTTP、logFaces-UDP、loggly、logstashHTTP、logstashUDP、mailgun、rabbitmq、redis、slack、smtp
        infoLogs: {
            type: 'dateFile',//dateFile（以日期划分日志文件） file（以文件大小划分日志文件）
            filename: 'logs/',
            backups: 5,  // 仅保留最新的五个日志文件
            pattern: ".yyyy-MM-dd", // 用于确定何时滚动日志的模式
            alwaysIncludePattern: true,
            compress: true    //  超过maxLogSize,压缩代码
        }
        // console
        //           appenders: { console: { type: 'console' } },
        //   categories: { default: { appenders: [ 'console' ], level: 'info' } }

    },
    categories: {//categories定义了日志输出类别，
        default: { appenders: ["infoLogs"], level: "all" },//当指定level为INFO时，只允许输出INFO级别以上的日志，WARN、ERROR都会被记录，但是TRACE和DEBUG不会。这也就是为什么，手动输出的三条日志，只打印两条的原因。
    },
});

export const logger = logs

const httpLog = log4js.getLogger('http');

export const httpLogger = log4js.connectLogger(httpLog, { level: 'ALL' });
