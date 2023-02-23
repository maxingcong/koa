import KoaRouter from "@koa/router";
import userRouter from './user/index'
import systemRouter from './system/index'
import fs from 'fs'
import path from "path";

const router = new KoaRouter()
const forums = new KoaRouter();
forums.use('/use', userRouter.routes())
forums.use('/system', systemRouter.routes());
router.prefix('/web/api')//设置路由前缀





const routerList: any[] = [];
const instance: Record<string, any> = {};
const routesDir = fs.readdirSync(path.resolve('app/route')).filter((item: string) => item.indexOf('v') >= 0);

routesDir.forEach((dirPath: string) => {
    instance[dirPath] = new KoaRouter({ prefix: `/${dirPath}` });
    const routesFiles = fs.readdirSync(path.resolve(path.resolve(`server/router/${dirPath}`))).filter((item: string) => item.indexOf('routes') >= 0);
    routesFiles.forEach((filePath: string) => {
        instance[dirPath].use(require(path.resolve(`server/router/${dirPath}/${filePath}`)).default.routes());
    });
    routerList.push(instance[dirPath].routes());
});


export default router.use('', forums.routes());