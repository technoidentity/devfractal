import type { Routing } from "express-zod-api";
import {
  defaultEndpointsFactory as api,
  createConfig,
  createServer,
} from "express-zod-api";
import { z } from "zod";

const config = createConfig({
  server: { listen: 8080 },
  cors: true,
  logger: { level: "debug", color: true },
});

const hello = api.build({
  method: "get",
  input: z.object({ name: z.string().optional() }),
  output: z.object({ greetings: z.string() }),
  handler: async ({ input: { name }, options, logger }) => {
    logger.debug("Options:", options); // middlewares provide options
    return { greetings: `Hello, ${name || "world"}. Happy coding!` };
  },
});

const routing: Routing = { hello };

createServer(config, routing);
