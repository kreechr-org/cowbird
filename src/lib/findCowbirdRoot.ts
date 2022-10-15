import path from "path";
import * as fs from "fs";
import {Logger} from "./logger.js";

export const findCowbirdRoot = (): string => {
    const dirs = process.cwd().split(path.sep);

    for (let i = 0; i < dirs.length; i++) {
        const checkPath = path.join(...Array(i).fill(".."), "package.json");
        if (fs.existsSync(checkPath)) {
            return path.join(process.cwd(), ...Array(i).fill(".."));
        }
    }

    Logger.error("Could not find package.json in any parent directory", {kill: true, ourFault: false});
    return "";
};