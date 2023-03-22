/**
 * This service is designed to work with configurations.
 */
export class ConfigService {

    /**
     * Our config will be stored here.
     */
    private readonly data: ConfigService.Config;

    constructor(data: ConfigService.Config) {
        this.data = data;
    }

    get(): ConfigService.Config {
        return this.data;
    }
}


export declare namespace ConfigService {

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
}