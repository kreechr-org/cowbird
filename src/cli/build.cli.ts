import readline from "readline";
import {displayLogo} from "../lib/logger.js";
import chalk from "chalk";
import {BuildOptions} from "esbuild";
import {DeployService} from "../services/deploy.service.js";

const SPACING = 40;
const CUT_OFF = 20;


export class BuildCli {

    private readonly buildOptions;

    constructor(buildOptions: BuildOptions) {
        this.buildOptions = buildOptions;
    }

    listen(): void {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on("keypress", async (str, key) => {
            if (key.ctrl && key.name === "c") {
                process.exit();
            } else if (Object.keys(commands).indexOf(key.name) !== -1) {
                commands[key.name][1]();
            }
        });
    }

    static refreshConsole(): void {
        console.clear();
        displayLogo();

        Object.keys(commands).forEach((key: keyof typeof commands) => {
            let r = "";
            const keyDescription = commands[key][0] as string;
            if (keyDescription.length > CUT_OFF) {
                r = r + keyDescription.substring(0, CUT_OFF - 3) + "...";
            } else {
                r = r + keyDescription;
            }
            const remainingChars = SPACING - r.length;
            r = r + " ".repeat(remainingChars) + chalk.gray("[" + chalk.blue(key) + "]");
            console.log(r);
        });

    }
}

const commands = {
    "c": ["Clear console", BuildCli.refreshConsole],
    "d": ["Full deploy", () => new DeployService().fullDeploy()],
    "p": ["Plan deploy", () => new DeployService().planDeploy()],
    "u": ["Update deploy", () => new DeployService().updateDeploy()]
};

