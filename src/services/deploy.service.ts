import {GenericService} from "./generic.service.js";
import {runProc} from "../lib/procUtils/runProc.js";
import path from "path";
import {existsSync, readdirSync, readFileSync, unlinkSync} from "fs";
import {Logger} from "../lib/logger.js";
import {LambdaClient, UpdateFunctionCodeCommand} from "@aws-sdk/client-lambda";
import {runWithSpinnerAsync} from "../lib/procUtils/runWithSpinnerAsync.js";
import {TFOutput} from "../lib/TFOutput.js";

export class DeployService extends GenericService {

    private iacDir = path.join(this.buildRoot, "terraform");
    private planJson = path.join(this.cacheDir, "plan.json");

    async planDeploy() {
        await runProc("Running terraform plan",
            `terraform plan -out=${this.planJson}`,
            this.iacDir);
        Logger.info("Done. If running in CLI, just press [d] to deploy");
    }

    async fullDeploy() {
        if (existsSync(this.planJson)) {
            await runProc("Running terraform deploy", `terraform apply ${this.planJson} `, this.iacDir);
            unlinkSync(this.planJson);
        } else {
            Logger.warn("No plan found, please run plan deploy first");
        }
    }

    async updateDeploy() {
        const tfOutput = new TFOutput(this.iacDir);
        await tfOutput.init();

        const updateCommands = readdirSync(this.outDir)
            .filter((fileOrDir) => fileOrDir.match(/.*\.(zip?)/ig))
            .map((zipFile) =>
                runWithSpinnerAsync(`Updating ${zipFile.split(".")[0]}`, async () => {
                    const lambdaClient = new LambdaClient({});

                    const defaultFnName = zipFile.split(".")[0];
                    const outputName = tfOutput.getFunctionByZip(defaultFnName);
                    const updateFunctionCodeCommand = new UpdateFunctionCodeCommand({
                        FunctionName: outputName === "" ? defaultFnName : outputName,
                        ZipFile: readFileSync((path.join(this.outDir, `${zipFile}`))),
                    });
                    return await lambdaClient.send(updateFunctionCodeCommand);
                }));

        Promise.all(updateCommands).then(() => Logger.info("Done")).catch((e) => Logger.error(e.message, {
            kill: false,
            ourFault: false
        }));
    }
}