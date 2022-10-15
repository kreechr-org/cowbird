import {Command} from "commander";
import {InitService} from "../services/init.service.js";
import {DeployService} from "../services/deploy.service.js";
import {BuildService} from "../services/build.service.js";
import {Logger, postInitInstructions} from "../lib/logger.js";

export class MainCli {

    private program = new Command();

    constructor() {
        this.program.name("cowbird")
            .description("A CLI tool to help you manage your serverless projects");
    }

    run() {
        this.program.parse();
    }

    buildCommand() {
        this.program.command("build")
            .description("Build a project")
            .option("-w, --watch", "Run in watch mode", false)
            .action((options) => {
                new BuildService(options).build().catch(e => Logger.error(e));
            });
        return this;
    }

    initCommand() {
        this.program.command("init")
            .description("Create a new project")
            .argument("<projectName>", "Project name")
            .action((projectName) => {
                new InitService({projectName}).init();
                postInitInstructions(projectName);
            });
        return this;
    }

    deployCommand() {
        this.program.command("deploy")
            .description("Do a full deploy of the project")
            .action(async () => {
                try {
                    const ds = new DeployService();
                    await ds.planDeploy();
                    await ds.fullDeploy();
                    Logger.info("Done");
                } catch (e) {
                    Logger.error(e);
                }
            });
        return this;
    }

    updateCommand() {
        this.program.command("update")
            .description("Do a deploy of just the code")
            .action(() => {
                new DeployService().updateDeploy();
            });
        return this;
    }
}