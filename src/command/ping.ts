import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";

import { ServiceManager } from "@manager";
import { Command, SlashCommand } from "@command";

export class Ping implements Command {

    data: SlashCommand;
    isGlobal: boolean;

    constructor() {
        this.isGlobal = true;
        this.data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Pong!");
    }

    async execute(interaction: ChatInputCommandInteraction<CacheType>, serviceManager: ServiceManager): Promise<void> {
        await interaction.reply("Pong!");
    }

}