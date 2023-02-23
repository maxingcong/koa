import KoaRouter from "@koa/router";
import type {
    KoaContext as CTX
} from "@/koa";

const router = new KoaRouter({ prefix: '/api/test' });

router.get('/', async (ctx: CTX) => {
    ctx.utils.dayjs(Date.now()).format('YYYY-MM-DD');

    ctx.body = {
        code: 200,
        message: "success",
        data: {}
    }
});

export default router;
