import * as Dotenv from "dotenv";
import { SERVICE_IDENTIFIER } from "./src/common/constants";
import { createContainer } from "./src/infrastructure/iocContainer";
import { IDiscordService, ILogger } from "./src/services";

Dotenv.config();

const startApp = async () => {
  const container = await createContainer();

  const discordService = container.get<IDiscordService>(
    SERVICE_IDENTIFIER.DISCORD_SERVICE
  );
  const logger = container.get<ILogger>(SERVICE_IDENTIFIER.LOGGER);
  const discordClient = discordService.discordClient;

  discordClient.on("ready", () => {
    logger.info(`Logged in as ${discordClient.user.tag}!`);
  });

  discordClient.on("message", (msg) => {
    if (msg.content === "ping") {
      msg.reply("pong");
    }
  });

  discordService.login();
};

startApp();
