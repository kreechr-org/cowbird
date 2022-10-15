import chalk from "chalk";
import ora, {Ora} from "ora";
import logSymbols from "log-symbols";

const GITHUB_URL = "https://github.com/kreechr-org/cowbird/issues";


export const displayLogo = (): void => {
    //  __________
    //  / ___  ___ \             ,ad8888ba,   88888888ba
    // / / @ \/ @ \ \           d8"'    `"8b  88      "8b
    // \ \___/\___/ /\         d8'            88      ,8P
    //  \____\/____/||         88             88aaaaaa8P'
    //  /     /\\\\\//         88             88""""""8b,
    // |     |\\\\\\           Y8,            88      `8b
    //  \      \\\\\\           Y8a.    .a8P  88      a8P
    //    \______/\\\\           `"Y8888Y"'   88888888P"
    //     _||_||_


    console.log(chalk.cyan("  __________            "));
    console.log(chalk.cyan(" / ___  ___ \\             ,ad8888ba,   88888888ba"));
    console.log(chalk.cyan("/ / @ \\/ @ \\ \\           d8\"'    `\"8b  88      \"8b"));
    console.log(chalk.cyan("\\ \\___/\\___/ /\\         d8'            88      ,8P  "));
    console.log(chalk.cyan(" \\____\\/____/||         88             88aaaaaa8P'"));
    console.log(chalk.cyan(" /     /\\\\\\\\\\//         88             88\"\"\"\"\"\"8b,"));
    console.log(chalk.cyan("|     |\\\\\\\\\\\\           Y8,            88      `8b"));
    console.log(chalk.cyan(" \\      \\\\\\\\\\\\           Y8a.    .a8P  88      a8P"));
    console.log(chalk.cyan("   \\______/\\\\\\\\           `\"Y8888Y\"'   88888888P\""));
    console.log(chalk.cyan("    _||_||_             "));

    console.log("\n");
};

export const postInitInstructions = (projectName: string): void => {
    console.log(chalk.green("Cowbird has been successfully installed!"));
    console.log(chalk.green("To get started, run the following:"));
    console.log(chalk.white(`\t 1. cd ${projectName} && npm i`));
    console.log(chalk.white("\t 2. cd terraform/ && terraform init"));
    console.log(chalk.white("\t 3. Check variables.tf and update as required"));
    console.log(chalk.green("After you successfully initialized your IaC, run the following command to start the build:"));
    console.log(chalk.white("\t cowbird build -w"));
    console.log(chalk.green("Then follow the instructions on the screen to deploy your project."));
};

export class Logger {

    static warn = (message: string): void => {
        console.warn(logSymbols.warning + chalk.yellow(` ${message}`));
    };
    static info = (message: string): void => {
        const time = new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        console.log(" [" + chalk.gray(time) + "]" + logSymbols.info + " " + message);
    };
    static error = (message: string, options?: { kill?: boolean, ourFault?: boolean }): void => {
        console.log(logSymbols.error + chalk.red(" Ran into a problem"));
        console.log(chalk.gray(message));
        console.log(chalk.red("\n"));

        if (options.ourFault) {
            console.log(logSymbols.error + chalk.red(` If you are stuck, please report this to ${GITHUB_URL}`));
        }
        if (options.kill) {
            process.exit(1);
        }
    };

    static loading = (message: string): Ora => {
        return ora({text: message, discardStdin: false}).start();
    };
}