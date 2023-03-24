import { Command } from "@command";
import { REST, Routes } from "discord.js";


export async function registerCommandsInGuild(
    token: string,
    clientId: string,
    guildId: string,
    commands: any[]) {
    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(token);

    // The put method is used to fully refresh all commands in the guild with the current set
    return await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
    );
}

export async function registerCommandsInGlobal(
    token: string,
    clientId: string,
    commands: any[]) {
    // Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(token);

    // The put method is used to fully refresh all commands in the guild with the current set
    return await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
    );
}


export async function registerCommands(
    token: string,
    clientId: string,
    guildIds: string[],
    commands: Command[]
): Promise<Map<string, Command>> {
    const guildCommands = [];
    const globalCommands = [];

    const map = new Map<string, Command>();

    for (const command of commands) {
        map.set(command.data.name, command);
        const json = command.data.toJSON();
        command.isGlobal ? globalCommands.push(json) : guildCommands.push(json);
    }

    await registerCommandsInGlobal(token, clientId, globalCommands);

    for (const guildId of guildIds) {
        await registerCommandsInGuild(token, clientId, guildId, globalCommands);
    }

    return map;
}