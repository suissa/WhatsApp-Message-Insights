import { FastifyInstance } from "fastify";

const CONTEXTS = [
  { id: "sales", description: "Detects purchase intent and conversion probability.", chartType: "funnel" },
  { id: "support", description: "Identifies complaints, frustration, and urgency.", chartType: "bar" },
  { id: "delivery", description: "Evaluates delivery satisfaction and communication efficiency.", chartType: "line" },
  { id: "satisfaction", description: "Measures sentiment and emotional tone.", chartType: "pie", default: true },
];

export async function contextsRoutes(fastify: FastifyInstance) {
  fastify.get("/", async () => CONTEXTS);
}
