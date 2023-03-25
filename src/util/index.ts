import { readFileSync } from "fs";
import { ConfigService } from "@service";

export function loadConfigFromFile(path: string): ConfigService.Config {
    const buffer = readFileSync(path);
    return JSON.parse(buffer.toString());
}
