import { Logger } from "tslog";
import { readFileSync } from "fs";


import { Config, ConfigService } from "@service";
import { ServiceManager } from "@manager";



/**
 * The function starts the entire project.
 */
async function main() {

    const logger = new Logger();
    /**
     * Reading the config from the file.
     */
    const file = readFileSync("config.json");
    const config: Config = JSON.parse(file.toString());

    logger.debug("The config is loaded.")

    const configService = new ConfigService(config);

    const serviceManager = new ServiceManager();

    serviceManager.setService(configService);
    serviceManager.setService(logger);


}


main().catch(console.error);
