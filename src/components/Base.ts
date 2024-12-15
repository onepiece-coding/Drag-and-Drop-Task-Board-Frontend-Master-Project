
export class Base<T extends HTMLElement> {
    private _template! : HTMLTemplateElement;
    private _hostElement! : HTMLDivElement;
    protected element! : T;

    constructor(
        private _templateId : string,
        private _hostId : string,
        private _elementId : string,
        private _positionAfterBegin : boolean
    ) {
        const [template, _] = this._assignTargetElements(this._templateId, this._hostId);
        const templateContent = document.importNode(template.content, true);
        this.element = templateContent.firstElementChild as T;
        this.element.id = this._elementId;
        this._insertElement(this._positionAfterBegin);
    }

    /**
     * @desc Assign target elements : template & host
     * @param1 templateId : string
     * @param2 hostId : string
     * @returns [template : HTMLTemplateElement, host : HTMLDivElement]
    */
    private _assignTargetElements(
        templateId : string, hostId : string
    ) : [HTMLTemplateElement, HTMLDivElement] {
        this._template = document.getElementById(templateId)! as HTMLTemplateElement;
        this._hostElement = document.getElementById(hostId)! as HTMLDivElement;
        return [this._template, this._hostElement];
    }

    /**
     * @desc Insert element in the right position "afterbegin" Or "beforeend"
     * @param positionAfterBegin : boolean
    */
    private _insertElement(positionAfterBegin : boolean) {
        this._hostElement.insertAdjacentElement(
            positionAfterBegin ? "afterbegin" : "beforeend", 
            this.element
        );
    }
}
