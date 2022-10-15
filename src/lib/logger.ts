import chalk from "chalk";
import ora, {Ora} from "ora";
import logSymbols from "log-symbols";

const GITHUB_URL = "https://github.com/kreechr-org/cowbird/issues";


export const displayLogo = (): void => {

    console.log(chalk.cyan("  __________\n") +
        chalk.cyan(" / ___  ___ \\\n") +
        chalk.cyan("/ / @ \\/ @ \\ \\\n") +
        chalk.cyan("\\ \\___/\\___/ /\\\n") +
        chalk.cyan(" \\____\\/____/||\n") +
        chalk.cyan(" /     /\\\\\\\\\\//\n") +
        chalk.cyan("|     |\\\\\\\\\\\\\n") +
        chalk.cyan(" \\      \\\\\\\\\\\\\n") +
        chalk.cyan("   \\______/\\\\\\\\\n") +
        chalk.cyan("    _||_||_"));

    console.log("\n");
};

export const postInitInstructions = (projectName: string): void => {
    console.log(chalk.green("Cowbird has been successfully installed!"));
    console.log(chalk.green("To get started, run the following:"));
    console.log(chalk.gray(`\t 1. cd ${projectName} && npm i`));
    console.log(chalk.gray("\t 2. cd terraform/ && terraform init"));
    console.log(chalk.gray("\t 3. Check variables.tf and update as required"));
    console.log(chalk.green("After you successfully initialized your IaC, run the following command to start the build:"));
    console.log(chalk.gray("\t cowbird build -w"));
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
        console.log("[" + chalk.gray(time) + "]" + logSymbols.info + " " + message);
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