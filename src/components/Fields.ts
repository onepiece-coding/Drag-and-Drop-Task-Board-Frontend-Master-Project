import { autoBind } from "../decorators/autoBind";
import { projectState } from "../store/ProjectState";
import { assignValidateInputs, handleValidationErrors } 
    from "../utils/validation/validation_helpers";
import { Base } from "./Base";

export class Fields extends Base<HTMLFormElement> {
    constructor() {
        super("fields", "app", "form", true);
        this._addProjectOnSubmit();
    }

    private _addProjectOnSubmit() : void {
        this.element.addEventListener("submit", this._handleAddProject);
    }

    @autoBind // decorator
    private _handleAddProject(event : Event) {
        event.preventDefault();

        const [titleInput, descriptionInput] = this._targetInputs();
        const [titleValue, descriptionValue] = this._getInputsValues(titleInput, descriptionInput);

        if (this._validateInputsValues(titleValue, descriptionValue)) {
            projectState.createProject(titleValue, descriptionValue);
            this._clearInputs(titleInput, descriptionInput);
        }
    }

    /**
     * @desc Get Inputs (Fields)
     * @returns inputs => [titleInput, descriptionInput] : HTMLInputElement[]
    */
    private _targetInputs(): HTMLInputElement[] {
        const titleInput = document.getElementById("title")! as HTMLInputElement;
        const descriptionInput = document.getElementById("description")! as HTMLInputElement;
        return [titleInput, descriptionInput];
    }

    /**
     * 
     * @param1 titleInput : HTMLInputElement
     * @param2 descriptionInput : HTMLInputElement
     * @returns inputs values => [titleValue, descriptionValue] : string[]
     */
    private _getInputsValues(
        titleInput : HTMLInputElement, descriptionInput : HTMLInputElement
    ) : string[] {
        return [titleInput.value, descriptionInput.value];
    }

    /**
     * @desc Make it valid
     * @param1 titleValue : string
     * @param2 descriptionValue : string
     * @returns boolean
     */
    private _validateInputsValues(titleValue : string, descriptionValue : string) {
        const [titleInputRule, descriptionInputRule] = 
            assignValidateInputs(titleValue, descriptionValue);

        const titleErrorMsg = handleValidationErrors(titleInputRule);
        const descriptionErrorMsg = handleValidationErrors(descriptionInputRule);

        if (titleErrorMsg) {
            alert(titleErrorMsg);
            return false;
        }

        if (descriptionErrorMsg) {
            alert(descriptionErrorMsg);
            return false
        }

        return true;
    }

    /**
     * @desc Clear Inputs Values after The Project Creation
     * @param1 titleInput : HTMLInputElement
     * @param2 descriptionInput : HTMLInputElement
     */
    private _clearInputs(
        titleInput : HTMLInputElement, descriptionInput : HTMLInputElement
    ) : void {
        titleInput.value = "";
        descriptionInput.value = "";
    }
}
