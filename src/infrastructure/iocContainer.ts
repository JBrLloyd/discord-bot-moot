import "reflect-metadata";
import { Container } from "inversify";
import { DiscordService, IDiscordService, ILogger, Logger } from "../services";
import { SERVICE_IDENTIFIER } from "../common/constants";

export const createContainer = async () => {
  const container = new Container();

  container.bind<ILogger>(SERVICE_IDENTIFIER.LOGGER).to(Logger);
  container
    .bind<IDiscordService>(SERVICE_IDENTIFIER.DISCORD_SERVICE)
    .to(DiscordService);

  return container;
};
