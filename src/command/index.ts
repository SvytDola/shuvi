import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

import { ServiceManager } from "@manager";

export type SlashCommand =
    SlashCommandBuilder |
    SlashCommandSubcommandBuilder |
    SlashCommandSubcommandsOnlyBuilder |
    SlashCommandSubcommandGroupBuilder;

export type Command = {
    isGlobal: boolean;
    data: SlashCommand;
    execute(interaction: ChatInputCommandInteraction, serviceManager: ServiceManager): Promise<void>;
}

export type SubCommand = Omit<Command, "isGlobal" | "data">;

export { Ping } from "./ping";
