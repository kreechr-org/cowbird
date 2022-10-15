import {build} from "esbuild";
import path from "path";
import {GenericService} from "./generic.service.js";
import {findEntryPoints} from "../lib/fileUtils/findEntryPoints.js";
import {CowbirdPlugin} from "../core/CowbirdPlugin.js";

interface IBuildService {
    watch?: boolean;
}

export class BuildService extends GenericService implements IBuildService {
    watch = false;

    constructor(options: IBuildService) {
        super();
        this.watch = options.watch;
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
            plugins: [CowbirdPlugin]
        });
    }

}