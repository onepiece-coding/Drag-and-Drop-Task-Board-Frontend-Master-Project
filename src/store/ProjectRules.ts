import { projectStatus } from "../utils/enums/projectStatus";

export class ProjectRules {
    constructor (
        public id : string,
        public title : string,
        public description : string,
        public status : projectStatus
    ) {}
}
