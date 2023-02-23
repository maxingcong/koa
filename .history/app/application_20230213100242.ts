import Koa from 'koa'
import KoaCompose from "koa-compose";
import fs from 'fs'
const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()
    const router: any[] = [];
    // @ts-ignore
    fs.readdirSync(path.resolve('./src/router')).forEach((filePath) => router.push(require(path.resolve(`./src/router/${filePath}`)).default.routes()));

    const useCompose = KoaCompose([
        ...router,
    ]);

    app.use(useCompose);

    return app
}

export default createServer