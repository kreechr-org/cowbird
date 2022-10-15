import {Logger} from "../logger.js";

export const runWithSpinnerAsync = async (message: string, command: () => Promise<void>) => {
    const spinner = Logger.loading(message);

    try {
        await command();
        spinner.succeed();
    } catch (e) {
        spinner.fail();
        Logger.error(e.message, {kill: true, ourFault: true});
    }
};