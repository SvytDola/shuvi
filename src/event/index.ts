import { Command } from "@command";
import { ServiceManager } from "@manager";
import { Interaction } from "discord.js";

export async function onInteractionCreate(
    commands: Map<string, Command>,
    serviceManager: ServiceManager,
    interaction: Interaction
) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (command === undefined) return;

    await command.execute(interaction, serviceManager)
}
