import {getDirname} from "../lib/fileUtils/getDirname.js";
import {runWithSpinnerSync} from "../lib/procUtils/runWithSpinnerSync.js";
import * as path from "path";
import fs_extra from "fs-extra";


export type TemplateNames = "aws-tf"

export class TemplateService {

    private readonly templateName: TemplateNames;
    private readonly templateDir = path.join(getDirname(), "..", "..", "..", "templates");

    constructor(templateName: TemplateNames) {
        this.templateName = templateName;
    }

    create(destinationPath: string): void {
        fs_extra.ensureDirSync(destinationPath);
        runWithSpinnerSync("Creating template", () => this.createTemplate(destinationPath));
    }

    private createTemplate(destinationPath: string): void {
        const coreTemplate = path.join(this.templateDir, "core");
        fs_extra.copySync(coreTemplate, destinationPath);

        const iacTemplate = path.join(this.templateDir, this.templateName);
        fs_extra.copySync(iacTemplate, path.join(destinationPath, "terraform"));
    }
}