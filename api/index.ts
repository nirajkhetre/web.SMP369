import { app, httpServer, errorHandler } from "../server/app.js";
import { registerRoutes } from "../server/routes.js";

// Lazy initialization to ensure routes are registered only once
// and to avoid top-level await issues in Vercel Serverless Functions
let routesRegistered = false;

export default async function handler(req: any, res: any) {
    if (!routesRegistered) {
        await registerRoutes(httpServer, app);
        app.use(errorHandler);
        routesRegistered = true;
    }

    app(req, res);
}
