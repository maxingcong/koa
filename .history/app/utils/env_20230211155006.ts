import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve('.env') });
switch (process.env.NODE_ENV) {
    case "development":
        dotenv.config({ path: path.resolve('.env.development') });
        break;
    case "production":
        dotenv.config({ path: path.resolve('.env.production') });
        break;
    default:
        console.error('error: Lack of environment differentiation (NODE_ENV)');
}
