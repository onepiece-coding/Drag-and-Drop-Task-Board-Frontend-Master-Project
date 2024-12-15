import { autoBind } from "../decorators/autoBind";
import { ProjectRules } from "../store/ProjectRules";
import { projectState } from "../store/ProjectState";
import { Base } from "./Base";

export class ProjectItem extends Base<HTMLDivElement> {
    private _project : ProjectRules;

    constructor(projectsListId : string, project : ProjectRules) {
        super("project-template", projectsListId, project.id, false);
        this._project = project;
        this._renderProject();
        this._deleteProject();
        this._runDragging();
    }

    /**
     * @desc Render Project Item with addes title and description
    */
    private _renderProject() {
        const projectTitleEl = this.element.querySelector(".project-title")! as HTMLHeadingElement;
        const projectDescriptoionEl = this.element.querySelector(".project-item--body")! as HTMLParagraphElement;
        projectTitleEl.textContent = this._project.title;
        projectDescriptoionEl.textContent = this._project.description;
    }

    /**
     * @desc Delete project on delete button click 
    */
    private _deleteProject() : void {
        const deleteBtn = this.element.querySelector(".delete")! as HTMLButtonElement;
        deleteBtn.addEventListener("click", this._handleDeleteProject.bind(this));
    }

    /**
     * @desc Delete project based on user Confirmation
    */
    @autoBind
    private _handleDeleteProject() : void {
        if (confirm("Are you sure! you wanna delete this project?")) {
            projectState.deleteProject(this._project.id);
        }
    }

    private _runDragging() {
        this.element.addEventListener("dragstart", this._handleDragStart);
        this.element.addEventListener("dragend", this._handleDragEnd);
    }

    @autoBind
    private _handleDragStart(event : DragEvent) {
        this.element.style.opacity = "0.6";

        event.dataTransfer!.setData("text/plain", this._project.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    @autoBind
    private _handleDragEnd() {
        this.element.style.opacity = "1";
    }
}
