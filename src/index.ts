#!/usr/bin/env node

import {MainCli} from "./cli/main.cli.js";
import {displayLogo} from "./lib/logger.js";

async function main(): Promise<void> {
    displayLogo();

    new MainCli().initCommand()
        .buildCommand()
        .deployCommand()
        .updateCommand()
        .run();

}

main().catch(e => console.error(e));