import {Plugin} from "esbuild/lib/main.js";
import {BuildCli} from "../cli/build.cli.js";
import {PluginService} from "../services/plugin.service.js";

let buildCli: BuildCli;

export const initCowbirdPlugin = (exit: () => void): Plugin => {
    return {
        name: "CowbirdPlugin",
        setup(build) {
            build.onEnd(() => {
                if (build.initialOptions.watch) {
                    BuildCli.refreshConsole();
                    if (!buildCli) {
                        buildCli = new BuildCli(build.initialOptions);
                        buildCli.listen(exit);
                    }
                }
                new PluginService().zipBundles(build);
            });
        },
    };
};