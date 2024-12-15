import { autoBind } from "../decorators/autoBind";
import { ProjectRules } from "../store/ProjectRules";
import { projectState } from "../store/ProjectState";
import { projectStatus } from "../utils/enums/projectStatus";
import { Base } from "./Base";
import { ProjectItem } from "./ProjectItem";

export class ProjectsList extends Base<HTMLDivElement> {
    constructor(private _status: "Initial" | "Active" | "Finished") {
        super("projects", "app", `${_status}-projects`, false);
        this._renderProjectsList();
        // On Page Load
        if (localStorage.getItem("projects")) {
            this._renderProjects(this._filteredProjectsBasedOnStatus(
                JSON.parse(localStorage.getItem("projects")!)
            ));
        }
        // To get data (projects list) from ProjectState to ProjectsList => We'll use callback
        projectState.pushListner((projects : ProjectRules[]) => {
            this._renderProjects(this._filteredProjectsBasedOnStatus(projects));
        });
        this._runDragging();
    }

    /**
     * @desc Render projects list specific own status
    */
    private _renderProjectsList() {
        const projectsListTitleEl = this.element.querySelector(".projects-list--title")! as HTMLHeadingElement;
        const projectsListContainerEl = this.element.querySelector(".projects-list--container")! as HTMLDivElement;
        projectsListTitleEl.textContent = `${this._status} Projects`;
        projectsListContainerEl.id = `${this._status}-projects-list`;
    }

    /**
     * @desc Render Projects in the Projects List DIV element
     * @param filteredProjects : ProjectRules[]
    */
    private _renderProjects(filteredProjects : ProjectRules[]) {
        const projectsListEl = document.getElementById(`${this._status}-projects-list`)! as HTMLDivElement;
        projectsListEl.innerHTML = "";
        filteredProjects.forEach(project => {
            new ProjectItem(`${this._status}-projects-list`, project);
        });
    }

    /**
     * @desc Take Projects List from state & Filter them based on Status
     * @param projects : ProjectRules[]
     * @returns Filtered Projects : ProjectRules[]
     */
    private _filteredProjectsBasedOnStatus(projects : ProjectRules[]) : ProjectRules[] {
        const filteredProjects = projects.filter((project : ProjectRules) => {
            switch (this._status) {
                case 'Initial':
                    return project.status === projectStatus.Initial;
                case 'Active':
                    return project.status === projectStatus.Active;
                case 'Finished':
                    return project.status === projectStatus.Finished;
                default:
                    console.log("Unknown Status!");
                    break;
            }
        });
        return filteredProjects;
    }   

    private _runDragging() {
        this.element.addEventListener("dragover", this._handleDragOver);
        this.element.addEventListener("dragleave", this._handleDragLeave);
        this.element.addEventListener("drop", this._handleDrop);
    }

    @autoBind
    private _handleDragOver(event : DragEvent) {
        event.preventDefault();
        this._stylesItDragOver();
    }

    @autoBind
    private _handleDragLeave() {
        this._resetStylesOnDragLeave();
    }

    @autoBind
    private _handleDrop(event : DragEvent) {
        const projectId = event.dataTransfer!.getData("text/plain");
        const newStatus = (this._status === "Initial" && projectStatus.Initial) ||
                    (this._status === "Active" && projectStatus.Active) ||
                    (projectStatus.Finished);
        projectState.changeProjectStatus(projectId, newStatus);
        this._resetStylesOnDragLeave();
    }

    private _stylesItDragOver() : void {
        const projectsListEl = this.element.querySelector(".projects-list--container")! as HTMLDivElement;
        projectsListEl.style.padding = "10px"
        projectsListEl.style.backgroundColor = "#ccc";
    }

    private _resetStylesOnDragLeave() : void {
        const projectsListEl = this.element.querySelector(".projects-list--container")! as HTMLDivElement;
        projectsListEl.style.padding = "0";
        projectsListEl.style.backgroundColor = "transparent";
    }
}
