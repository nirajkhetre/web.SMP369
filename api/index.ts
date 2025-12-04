import { app, httpServer, errorHandler } from "../server/app";
import { registerRoutes } from "../server/routes";

// Initialize routes
// Note: We use top-level await which is supported in Vercel Node.js functions
await registerRoutes(httpServer, app);

app.use(errorHandler);

export default app;
