import {GenericService} from "./generic.service.js";
import {runProc} from "../lib/procUtils/runProc.js";
import path from "path";
import {existsSync, readdirSync, unlinkSync} from "fs";
import {Logger} from "../lib/logger.js";

export class DeployService extends GenericService {

    private iacDir = path.join(this.buildRoot, "terraform");
    private planJson = path.join(this.cacheDir, "plan.json");

    async planDeploy() {
        await runProc("Running terraform plan",
            `terraform plan -out=${this.planJson}`,
            this.iacDir);
        Logger.info("Done");
    }

    async fullDeploy() {
        if (existsSync(this.planJson)) {
            await runProc("Running terraform deploy", `terraform apply ${this.planJson} `, this.iacDir);
            unlinkSync(this.planJson);
        } else {
            Logger.warn("No plan found, please run plan deploy first");
        }
    }

    updateDeploy() {
        //TODO: remove glob
        const dirCont = readdirSync(this.outDir);
        const zipFiles = dirCont.filter((elm) => elm.match(/.*\.(zip?)/ig))
            .map((file) => file.split(".")[0]);

        Promise.all(zipFiles.map(async (lambdaName) => await runProc(`Updating ${lambdaName}`,
            `aws lambda update-function-code --function-name ${lambdaName} --zip-file fileb://${path.join(this.outDir, `${lambdaName}.zip`)}`,
            this.buildRoot))).then(() => Logger.info("Done")).catch(e => Logger.error(e));

        Logger.info("Done");
    }
}