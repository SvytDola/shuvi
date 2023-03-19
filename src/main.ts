import { Logger } from "tslog";

import { ServiceManager } from "@manager";



async function main() {
    const logger = new Logger();

    const serviceManager = new ServiceManager();
    serviceManager.setService(logger);

}


main().catch(console.error);
