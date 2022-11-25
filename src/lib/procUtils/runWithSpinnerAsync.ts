import {Logger} from "../logger.js";

export const runWithSpinnerAsync = async <T>(message: string, command: () => Promise<T | void>) => {
    const spinner = Logger.loading(message);

    try {
        await command();
        spinner.succeed();
    } catch (e) {
        spinner.fail();
        Logger.error(e.message, {kill: false, ourFault: true});
    }
};