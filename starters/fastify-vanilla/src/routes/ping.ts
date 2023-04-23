import type { FastifyPluginAsync } from "fastify";

export const ping: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/ping", async function () {
    return "pong\n";
  });
};
