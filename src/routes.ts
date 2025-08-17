import { Hono } from "hono";
import { signup, processBrightdataResponse } from "./controller.js";

const routes = new Hono();

// User signup route
routes.post("/signup", signup);

// BrightData webhook route for processing responses
routes.post("/brightdata/webhook", processBrightdataResponse);

export default routes;
