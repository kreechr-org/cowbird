import {promisify} from "util";
import {exec} from "child_process";
import {Logger} from "../logger.js";

export const proc = promisify(exec);

export async function runProc(logMessage: string, cmd: string, cwd: string): Promise<void> {
    const spinner = Logger.loading(logMessage);
    await proc(cmd, {cwd: cwd}).then(({stderr, stdout}) => {
        if (stderr) {
            spinner.fail(stderr);

        } else {
            spinner.succeed(stdout);
        }
    }).catch(e => spinner.fail(e.message));
}