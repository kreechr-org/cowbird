import {Plugin} from "esbuild/lib/main.js";
import {BuildCli} from "../cli/build.cli.js";
import {PluginService} from "../services/plugin.service.js";

export const CowbirdPlugin: Plugin = {
    name: "CowbirdPlugin",
    setup(build) {
        build.onEnd(() => {
            if (build.initialOptions.watch) {
                BuildCli.refreshConsole();
                const buildCli = new BuildCli(build.initialOptions);
                buildCli.listen();
            }
            new PluginService().zipBundles(build);
        });
    },
};