import {Logger} from "../logger.js";

export const runWithSpinnerSync = (message: string, command: () => void) => {
    const spinner = Logger.loading(message);

    try {
        command();
        spinner.succeed();
    } catch (e) {
        spinner.fail();
        Logger.error(e.message, {kill: true, ourFault: true});
    }
};