import {join, sep} from "path";
import {readdirSync, statSync} from "fs";


/**
 * A helper function to find all entry points. It expects that the entry point is called index.ts.
 * @param rootDir - top level directory under which all index.ts can be found
 * @param skipDir- skip index.ts under these directories
 * @param potentialFileNames - in case index.ts is not good
 */
export function findEntryPoints(rootDir: string, skipDir: string[] = [], potentialFileNames: string[] = ["index.ts"]): string[] {
    const validFilepaths: string[] = [];

    walkSync(rootDir, (dir, file, filepath) => {
        if (validateFile(dir, file, potentialFileNames, skipDir)) {
            validFilepaths.push(filepath);
        }
    });
    return validFilepaths;
}

function validateFile(dir: string, file: string, potentialFileNames?: string[], skipDir?: string[]): boolean {
    const fileName = file;
    const dirs = dir.split(`${sep}`);
    return potentialFileNames.includes(fileName) && dirs.filter(value => skipDir.includes(value)).length < 1;
}


function walkSync(dir: string, callback: (dir: string, file: string, filepath: string) => void): void {
    const files = readdirSync(dir);
    files.forEach((file) => {
        const filepath = join(dir, file);
        const stats = statSync(filepath);
        if (stats.isDirectory()) {
            walkSync(filepath, callback);
        } else if (stats.isFile()) {
            callback(dir, file, filepath);
        }
    });
}