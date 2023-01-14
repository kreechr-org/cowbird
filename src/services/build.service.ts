import {build} from "esbuild";
import path from "path";
import {GenericService} from "./generic.service.js";
import {findEntryPoints} from "../lib/fileUtils/findEntryPoints.js";
import {initCowbirdPlugin} from "../core/CowbirdPlugin.js";
import {Logger} from "../lib/logger.js";

interface IBuildService {
    watch?: boolean;
}

export class BuildService extends GenericService implements IBuildService {
    watch = false;

    constructor(options: IBuildService) {
        super();
        this.watch = options.watch;
    }


    private exit() {
        Logger.exitMessage();
        process.exit(0);
    }

    build() {
        return build({
            outdir: this.outDir,
            entryPoints: findEntryPoints(path.join(this.buildRoot, "src"), ["lib"], ["index.ts"]),
            platform: "node",
            watch: this.watch,
            treeShaking: true,
            bundle: true,
            minify: !this.watch,
            plugins: [initCowbirdPlugin(this.exit)]
        });
    }

}