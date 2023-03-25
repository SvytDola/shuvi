import { Logger } from "tslog";
import { Client, Events, GatewayIntentBits } from "discord.js";

import {
    Ping
} from "@command";
import { ConfigService } from "@service";
import { ServiceManager } from "@manager";
import { loadConfigFromFile } from "@util";
import { registerCommands } from "@register";
import { onInteractionCreate } from "@event";


/** 
 * The function starts the entire project.
 * Register commands.
 * Reading the config from the file.
 */
async function main() {

    const commands = [
        new Ping()
    ];

    const config = loadConfigFromFile("config.json");

    const logger = new Logger();
    const configService = new ConfigService(config);

    const serviceManager = new ServiceManager()
        .addService(configService)
        .addService(logger);

    const mapOfCommands = await registerCommands(config.token, config.clientId, config.guildIds, commands);
    logger.debug("The commands were registered.");

    const onInteraction = onInteractionCreate.bind(null, mapOfCommands, serviceManager);
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    })
        .addListener(Events.InteractionCreate, onInteraction)
        .addListener(Events.ClientReady, () => logger.debug("Connected."));

    logger.debug("Connecting...");
    await client.login(config.token);
}


main().catch(console.error);
