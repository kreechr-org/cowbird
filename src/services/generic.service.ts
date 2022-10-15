import {findCowbirdRoot} from "../lib/findCowbirdRoot.js";
import path from "path";
import {getDirname} from "../lib/fileUtils/getDirname.js";
import {ensureDirSync} from "fs-extra";

export class GenericService {
    protected readonly buildRoot: string = findCowbirdRoot();
    protected readonly cacheDir: string = path.join(getDirname(), ".cache");

    constructor() {
        ensureDirSync(this.cacheDir);
    }

}