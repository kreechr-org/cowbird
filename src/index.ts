#! /usr/bin/env node

import {MainCli} from "./cli/main.cli.js";
import {displayLogo, Logger} from "./lib/logger.js";

async function main(): Promise<void> {
    Logger.debug("Running in debug mode");
    displayLogo();

    new MainCli().initCommand()
        .buildCommand()
        .deployCommand()
        .updateCommand()
        .run();

}

main().catch(e => console.error(e));