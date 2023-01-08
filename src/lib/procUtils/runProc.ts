import {promisify} from "util";
import {exec} from "child_process";
import {Logger} from "../logger.js";
import {Ora} from "ora";

export const proc = promisify(exec);

export async function runProc(logMessage: string, cmd: string, cwd: string, showSucceedMessage = true): Promise<string | Ora> {
    const spinner = Logger.loading(logMessage);
    return await proc(cmd, {cwd: cwd}).then(({stderr, stdout}) => {
        if (stderr) {
            spinner.fail(stderr);
        } else if (showSucceedMessage) {
            spinner.succeed(stdout);
        } else {
            spinner.info("Done");
        }
        return stdout;
    }).catch(e => spinner.fail(e.message));
}