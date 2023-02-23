import log4js from "log4js";

// https://log4js-node.github.io/log4js-node/api.html
const env = String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")
const logs: any = log4js.getLogger();
logs.level = env == 'development' ? "debug" : ''; // levels(optional, object) - 用于定义自定义日志级别 
// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
logs.pm2 = true // 如果您使用pm2运行您的应用程序，请将此设置为 true ，否则日志将不起作用

log4js.configure({
    appenders: {
        out: {
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%d %p %c %x{user} %m%n",
                tokens: {
                    //   user: function (logEvent) {
                    //     return AuthLibrary.currentUser();
                    //   },
                },
            },
        },
        app: { type: "file", filename: "application.log" },
    },
    categories: {
        default: { appenders: ["out", "app"], level: "debug" },
    },
});

export const logger = logs

const httpLog = log4js.getLogger('http');

export const httpLogger = log4js.connectLogger(httpLog, { level: 'ALL' });
