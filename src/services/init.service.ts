import {TemplateService} from "./template.service.js";
import * as path from "path";

export interface InitProperties {
    projectName: string;
}

export class InitService {
    private readonly projectName: string;
    private readonly templateService = new TemplateService("aws-tf");
    private readonly projectDir: string;

    constructor(props: InitProperties) {
        this.projectName = props.projectName;
        this.projectDir = path.join(process.cwd(), this.projectName);
    }

    public init(): void {
        this.templateService.create(this.projectDir);
    }
}