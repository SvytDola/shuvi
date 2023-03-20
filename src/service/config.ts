/**
 * This service is designed to work with configurations.
 */
export class ConfigService {

    /**
     * Our config will be stored here.
     */
    private data: Config;

    constructor(data: Config) { 
        this.data = data;
    }

    get(key: keyof Config) {
        return this.data[key];
    }
}


export type Config = {

    /**
     * Discord auth token.
     */
    token: string;

    /**
     * Discord user id.
     */
    clientId: string;

    /**
     * Id guilds to which commands will be added.
     */
    guildIds: string[];

}
