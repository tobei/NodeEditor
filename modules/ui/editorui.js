import Emitter from "../event/emitter.js";
import WorkspaceUI from "./workspaceui.js";
import DragManager from "./dragmanager.js";
import Transform2 from "./transform2.js";

export default class EditorUI extends Emitter {

    constructor(viewportElement) {
        super();
        this.viewportElement = viewportElement;
        this.workspace = new WorkspaceUI(this);

        this.backgroundElement = document.createElement('div');
        this.viewportElement.appendChild(this.backgroundElement);
        this.backgroundElement.style.position = 'absolute';
        this.backgroundElement.style.background = 'url(./background.svg)';
        this.backgroundElement.style.zIndex = '-1';
        this.backgroundTransform = new Transform2(this.backgroundElement, this.viewportElement, 80);
        this.backgroundTransform.on('transform', event => event.transform.apply(this.backgroundElement));



        this.viewportElement.addEventListener('click', event => {
            if (event.target === this.viewportElement) {
                this.workspace.deselectNodes();
            }
        });

        this.editorDragManager = new DragManager(this.viewportElement);
        this.editorDragManager.monitor(this.viewportElement, 1);
        this.editorDragManager.on('dragMove', event => {
            this.workspace.transform.translate(event.x, event.y);
            this.backgroundTransform.translate(event.x, event.y);
        });

        this.viewportElement.addEventListener('wheel', event => {
            const delta = 0.1 * Math.sign(event.deltaY);
            const workspaceDimensions = this.workspace.element.getBoundingClientRect();
            const ox = (workspaceDimensions.left - event.clientX);
            const oy = (workspaceDimensions.top - event.clientY);
            this.workspace.transform.scaleAround(ox, oy, delta);
            this.backgroundTransform.scaleAround(ox, oy, delta);
        });
    }

}