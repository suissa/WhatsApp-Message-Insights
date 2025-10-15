import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export async function setupSwagger(fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "WhatsApp Message Insights API",
        version: "4.2.0",
        description:
          "Analyze WhatsApp conversations using contextual metrics and narrative AI (OpenRouter-powered).",
      },
      servers: [{ url: "http://localhost:5050" }],
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "x-api-key",
            description: "Authentication key defined in .env (API_KEY)",
          },
        },
      },
      security: [{ ApiKeyAuth: [] }],
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    exposeRoute: true,
  });

  fastify.get("/openapi.json", async (_, res) => res.send(fastify.swagger()));
}
