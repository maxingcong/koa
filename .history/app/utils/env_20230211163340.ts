import path from "path";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve('.env') });
switch (String(process.env.NODE_MODE_ENV).replace(/(^\s*)|(\s*$)/g, "")) {
    case "development":
        dotenv.config({ path: path.resolve('.env.development') });
        break;
    case "production":
        dotenv.config({ path: path.resolve('.env.production') });
        break;
    default:
        console.error('error: Lack of environment differentiation (NODE_ENV)');
}
