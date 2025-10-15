import { generateInsightLLM } from "../ai/insightLLM.js";
import { analyzeMessages } from "../utils/aggregator.js";

export async function analyzeRoutes(fastify) {
  fastify.post("/", async (req, res) => {
    const { context = "satisfaction", messages } = req.body;

    const summary = await analyzeMessages(messages, context);
    const narrativeInsight = await generateInsightLLM(context, summary);

    return {
      ...summary,
      narrativeInsight,
      timestamp: new Date().toISOString(),
    };
  });
} 
