import { Logger } from "tslog";
import { readFileSync } from "fs";
import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";

import { 
    Command,
    Ping 
} from "@command";
import { ConfigService } from "@service";
import { ServiceManager } from "@manager";


/**
 * The function starts the entire project.
 */
async function main() {

    const logger = new Logger();
    /**
     * Reading the config from the file.
     */
    const buffer = readFileSync("config.json");
    const config: ConfigService.Config = JSON.parse(buffer.toString());

    logger.debug("The config is loaded.")

    const configService = new ConfigService(config);

    const serviceManager = new ServiceManager()
        .addService(configService)
        .addService(logger);

    logger.debug("Services were added.")

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    });

    const commands = [
        new Ping()
    ];
    const mapOfCommands = new Map<string, Command>();

    for (const command of commands) {
        mapOfCommands.set(command.data.name, command);
    }

    logger.debug("The commands were loaded.")


    client.addListener(Events.InteractionCreate, async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = mapOfCommands.get(interaction.commandName);
        if (command === undefined) return;
        
        await command.execute(interaction, serviceManager);
    });

    await client.login(config.clientId);

}


main().catch(console.error);
