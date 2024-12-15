import { projectStatus } from "../utils/enums/projectStatus";
import { ListnerType } from "./ListnerType";
import { ProjectRules } from "./ProjectRules";

class ProjectState {
    private static _instance : ProjectState;
    private _projects : ProjectRules[] = [];
    private _listners : ListnerType[] = [];
    private _localStorageProjects = localStorage.getItem("projects") ?
    JSON.parse(localStorage.getItem("projects")!) : [];

    constructor() {
        this._projects = this._localStorageProjects;
    }

    /**
     * @desc Create a new project and push it to The Projects List
     * @param1 titleValue : string
     * @param2 descriptionValue : string
     */
    public createProject(titleValue : string, descriptionValue : string) : void {
        const newProject : ProjectRules = {
            id : Math.random().toString(),
            title : titleValue,
            description : descriptionValue,
            status : projectStatus.Initial,
        }
        this._projects.push(newProject);
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }

    /**
     * @desc Delete a project by ID
     * @param projectId : string
     */
    public deleteProject(projectId : string) : void {
        const projectsAfterDelete = this._projects.filter((project : ProjectRules) => {
            return project.id !== projectId;
        });
        this._projects = projectsAfterDelete;
        this._runListners();
        localStorage.setItem("projects", JSON.stringify(this._projects));
    }

    public changeProjectStatus(projectId : string, newStatus : projectStatus) {
        const findProject = this._projects.find((project : ProjectRules) => {
            return project.id === projectId;
        });

        if (findProject && findProject.status !== newStatus) {
            findProject.status = newStatus;
            this._runListners();
            localStorage.setItem("projects", JSON.stringify(this._projects));
        }
    }   

    /**
     * @desc Pushing Listners Functions in array
     * @param listner : ListnerType (Function)
     */
    public pushListner(listner: ListnerType) {
        this._listners.push(listner);
    }

    /**
     * @desc Run Listners Functions and pass Projects List into them
    */
    private _runListners() {
        for (const listner of this._listners) {
            listner(this._projects);
        }   
    }

    /**
     * @desc Ensure that a class (ProjectState) has only one instance => Singleton Design Pattern
     */
    public static getInstance() {
        if (!this._instance) {
            this._instance = new ProjectState;
            return new ProjectState;
        }
        return this._instance;
    }
}

export const projectState = ProjectState.getInstance();
