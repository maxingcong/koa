class JSONRPC2 {
    private VERSION
    private errorMsg: any
    private methods
    private debug
    constructor(methods: any, debug: boolean) {
        this.VERSION = '2.0';//版本
        this.errorMsg = {//错误字典
            '-32700': 'Parse Error.',//分析错误
            '-32600': 'Invalid Request.',//请求无效
            '-32601': 'Method Not Found.',//找不到方法
            '-32602': 'Invalid Params.',//参数无效
            '-32603': 'Internal Error.',//内部错误
        };
        this.methods = Object.assign({}, methods);
        this.debug = !!debug;//是否调试
    }

    validRequest(rpc: any) {//数据校验
        return rpc.jsonrpc === this.VERSION /*版本校验*/
            && (typeof rpc.id === 'number' || typeof rpc.id === 'string')/*id校验*/
            && typeof rpc.method === 'string';/*函数名校验*/
    }

    normalize(rpc: any, obj: any) {//输出标准化
        if (obj.error && !obj.error.message) obj.error.message = this.errorMsg[obj.error.code];
        return Object.assign(obj, { jsonrpc: this.VERSION, id: rpc.id });
    }

    parse(rpc: any) {//协议解析
        if (!this.validRequest(rpc))//请求协议不规范
            return this.normalize(rpc, { error: { code: -32600 } });
        let method = this.methods[rpc.method];
        if (typeof method !== 'function')//函数匹配
            return this.normalize(rpc, { error: { code: -32601 } });
        let params = Array.isArray(rpc.params) ? rpc.params : [rpc.params];//参数解析
        try {
            return this.normalize(rpc, { result: method.apply(this.methods, params) });// 函数调用
        } catch (err: any) {
            return this.normalize(rpc, {//解析异常捕获
                error: {
                    code: err.code || -32603,
                    message: this.debug ? "[debug] " + String(err) : this.errorMsg[-32603]//非调试情况不输出错误详情
                }
            });
        }
    }


    handle(rpc: any) {//处理入库
        return Array.isArray(rpc) ? rpc.map(r => this.parse(r)) : this.parse(rpc);//判断是否批处理
    }
}