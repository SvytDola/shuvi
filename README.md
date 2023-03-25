# Shuvi
This is a discord application design pattern.

* [Installation](#installation)
* [Configuration](#configuration)
    * [Add custom command](#add-custom-tommand)
* [Running app](#running-the-app)
* [License](#license)

## Installation

```bash
$ npm install
```

## Configuration

Create a `config.json` file in the root of project:

```json
{
    "guildIds": ["guildId1", "guildId2"],
    "clientId": "client id",
    "token": "discord token"
}
```

## Add custom tommand
You can also add your custom command in `src/command`.

Example:
```ts
// src/command/example.ts
import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";

import { ServiceManager } from "@manager";
import { Command, SlashCommand } from "@command";

export class Example implements Command {
    data: SlashCommand;
    isGlobal: boolean;

    constructor() {
        this.isGlobal = true // Will there be a global command.
        this.data = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Pong!");
    }

    async execute(interaction: ChatInputCommandInteraction<CacheType>, serviceManager: ServiceManager): Promise<void> {
        await interaction.reply("Pong!");
    }
}
```
Next, you need to escort this command in the file `src/command/index.ts`.
```ts
export { Example } from "./example";
```

Then import the command in `src/main.ts`.
```ts

// ...
import {
    Ping,
    Example // Import only here to make it easier to navigate.
} from "@command";
// ...

async function main() {

    const commands = [
        new Ping(),
        new Example() // It is to this list that you need to add commands.
    ];
    // ...
}
```



## Running the app

```bash
$ npm run start
```

## License

Shuvi is [MIT licensed](LICENSE).