import 'module-alias/register'
import "@/utils/env";
import { isPort, getIpAddress } from "@/utils/index";
import createServer from './application';


module.exports = (async (): Promise<any> => {
    try {
        const app = await createServer()
        const SERVER_PORT = process.env.SERVER_PORT || 3001
        const port = await isPort(SERVER_PORT)
        return app.listen(port, getIpAddress)
    } catch (e) {
        console.log(e)
    }
})()