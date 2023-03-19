import { logger } from "@logger";

async function main() {
    logger.debug("The main function was launched.");
    logger.debug("A mistake was not found.");
}


main().catch(console.error);
