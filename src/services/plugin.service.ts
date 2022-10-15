import {PluginBuild} from "esbuild";
import {createWriteStream, readdirSync} from "fs";
import path from "path";
import {runWithSpinnerAsync} from "../lib/procUtils/runWithSpinnerAsync.js";
import {Logger} from "../lib/logger.js";
import archiver from "archiver";
import chalk from "chalk";

export class PluginService {
    zipBundles(build: PluginBuild): void {
        Promise.all(readdirSync(build.initialOptions.outdir, {withFileTypes: true})
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .map(async lambdaName => {
                const pathToLambda = path.join(build.initialOptions.outdir, lambdaName);
                return await runWithSpinnerAsync(`Creating zip for ${lambdaName}`,
                    async () => this.createZipFromDir(pathToLambda, lambdaName));
            })).catch(e => Logger.error(e.message));
    }

    private async createZipFromDir(pathToLambda, lambdaName) {
        const output = createWriteStream(`${pathToLambda}.zip`);
        const archive = archiver("zip", {
            zlib: {level: 9}
        });

        output.on("close", function () {
            const orange = chalk.hex("#FF9900");
            Logger.info(`Produced ${orange(`${lambdaName}.zip`)} with ${orange(`${archive.pointer()} bytes`)}`);
        });

        archive.on("warning", function (err) {
            if (err.code === "ENOENT") {
                Logger.warn(err.message);
            } else {
                Logger.error(err.message);
            }
        });
        archive.pipe(output);
        archive.directory(pathToLambda, false);
        await archive.finalize();
    }
}