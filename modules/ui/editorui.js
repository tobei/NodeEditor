import Emitter from "../event/emitter.js";
import WorkspaceUI from "./workspaceui.js";
import DragManager from "./dragmanager.js";

export default class EditorUI extends Emitter {

    constructor(viewportElement) {
        super();
        this.viewportElement = viewportElement;
        this.workspace = new WorkspaceUI(this);

        this.viewportElement.addEventListener('click', event => {
            if (event.target === this.viewportElement) {
                this.workspace.deselectNodes();
            }
        });

        this.editorDragManager = new DragManager(this.viewportElement);
        this.editorDragManager.monitor(this.viewportElement, 1);
        this.editorDragManager.on('dragMove', event => {
            this.workspace.transform.translate(event.x, event.y);
        });

        this.viewportElement.addEventListener('wheel', event => {
            const delta = 0.1 * event.deltaY / 100.0;
            const rect = this.workspace.element.getBoundingClientRect();
            const ox = (rect.left - event.clientX);
            const oy = (rect.top - event.clientY);
            this.workspace.transform.scaleAround(ox, oy, delta);
        });
    }

}