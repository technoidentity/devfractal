import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import closeWithGrace from "close-with-grace";
import dotenv from "dotenv";
import Fastify from "fastify";
import { appService } from "./appService";

dotenv.config();

const app = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// Register your application as a normal plugin.
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) || 500 },
  async function ({ err }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook("onClose", async (_, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen({ port: Number(process.env.PORT) || 8080 }, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
