import KoaRouter from "@koa/router";

const router = new KoaRouter({ prefix: '/api/test' });

router.get('/', (ctx: any) => {
    ctx.body = {
        code: 200,
        message: "success",
        data: { code: '1' }
    }
});

export default router;