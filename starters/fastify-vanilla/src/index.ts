/* eslint-disable no-console */
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { ping } from "./routes";

const app = fastify({
  logger: { transport: { target: "pino-pretty" } },
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(ping);

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
