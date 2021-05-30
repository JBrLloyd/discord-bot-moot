import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as Discord from "discord.js";
import { ILogger, IDiscordClient, IDiscordService } from "./";
import { SERVICE_IDENTIFIER } from "../common/constants";

/**
 * DiscordService
 */
@injectable()
export class DiscordService implements IDiscordService {
  public discordClient: IDiscordClient;
  private _logger: ILogger;

  public constructor(@inject(SERVICE_IDENTIFIER.LOGGER) logger: ILogger) {
    this._logger = logger;
    this.discordClient = new Discord.Client();
  }

  /**
   * login
   */
  public login() {
    try {
      this._logger.info(
        `Discord Client logging in with token (DISCORD_BOT_TOKEN) in config.`
      );
      this.discordClient.login(process.env.DISCORD_BOT_TOKEN);
    } catch (err) {
      this._logger.error(
        `Discord Client could not login, check bot token config. Error Message: ${err}.`
      );
    }
  }
}
