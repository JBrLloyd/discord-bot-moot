import { Client } from "discord.js";

export interface IDiscordClient extends Client {}
export interface IDiscordService {
  discordClient: IDiscordClient;
  login(): void;
}
