import Koa from 'koa'


const createServer = async (): Promise<Koa> => {
    const app: Koa = new Koa()



    return app
}

export default createServer