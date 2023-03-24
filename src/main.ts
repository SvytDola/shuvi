import { Logger } from "tslog";
import { readFileSync } from "fs";
import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";

import {
    Ping
} from "@command";
import { ConfigService } from "@service";
import { ServiceManager } from "@manager";
import { registerCommands } from "@register";


/** ё
 * The function starts the entire project.
 * Reading the config from the file.
 */
async function main() {

    const commands = [
        new Ping()
    ];

    const logger = new Logger();

    const buffer = readFileSync("config.json");
    const config: ConfigService.Config = JSON.parse(buffer.toString());
    logger.debug("The config is loaded.")

    const configService = new ConfigService(config);

    const serviceManager = new ServiceManager()
        .addService(configService)
        .addService(logger);

    const mapOfCommands = await registerCommands(config.token, config.clientId, config.guildIds, commands);
    logger.debug("The commands were registered.")

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    }).addListener(Events.InteractionCreate, async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = mapOfCommands.get(interaction.commandName);
        if (command === undefined) return;

        await command.execute(interaction, serviceManager);
    }).addListener(Events.ClientReady, () => logger.debug("Connected."))

    logger.debug("Connecting...");
    await client.login(config.token);
}


main().catch(console.error);
