import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.addHook("onRequest", async (req, reply) => {
    const requiredKey = process.env.API_KEY;
    const providedKey = req.headers["x-api-key"];

    if (!requiredKey) {
      fastify.log.error("⚠️ No API_KEY defined in .env");
      return reply.code(500).send({ error: "Server configuration missing." });
    }

    if (providedKey !== requiredKey) {
      return reply.code(401).send({ error: "Invalid or missing API key." });
    }
  });
}); 
