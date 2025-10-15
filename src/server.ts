import Fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import dotenv from "dotenv";
import authPlugin from "./plugins/auth.js";
import { setupSwagger } from "./swagger.js";
import { contextsRoutes } from "./routes/contexts.js";
import { analyzeRoutes } from "./routes/analyze.js";

dotenv.config();

const server = Fastify({ logger: true });

await server.register(cors);
await server.register(websocket);
await setupSwagger(server);
await server.register(authPlugin);

server.register(contextsRoutes, { prefix: "/metrics/contexts" });
server.register(analyzeRoutes, { prefix: "/api/analyze" });

server.get("/ws", { websocket: true }, (connection) => {
  connection.socket.send(JSON.stringify({ event: "ready", message: "Connected to WhatsApp Insights WS" }));
});

const PORT = process.env.PORT || 5050;
server.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
}); 
