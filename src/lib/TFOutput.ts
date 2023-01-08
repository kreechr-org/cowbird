import {runProc} from "./procUtils/runProc.js";

export class TFOutput {
    private readonly iacDir: string;
    private outputJson;

    constructor(iacDir: string) {

        this.iacDir = iacDir;
    }

    async init() {
        const output = await runProc("Loading the function names", "terraform output -json", this.iacDir, false);

        if (typeof (output) == "string") {
            this.outputJson = JSON.parse(output);
        }
    }

    getFunctionByZip(zipName: string): string {
        if (zipName in this.outputJson) {
            return this.outputJson[zipName].value;
        }
        return "";
    }

}