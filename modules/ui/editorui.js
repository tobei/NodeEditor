import Emitter from "../event/emitter.js";
import WorkspaceUI from "./workspaceui.js";
import DragManager from "./dragmanager.js";
import BackgroundUI from "./backgroundui.js";

export default class EditorUI extends Emitter {

    constructor(viewportElement) {
        super();
        this.element = viewportElement;
        this.workspace = new WorkspaceUI(this);
        this.background = new BackgroundUI(this.element);

        this.element.addEventListener('click', event => {
            if (event.target === this.element) {
                this.workspace.deselectNodes();
            }
        });

        this.editorDragManager = new DragManager(this.element);
        this.editorDragManager.monitor(this.element, 1);
        this.editorDragManager.on('dragMove', event => {
            this.workspace.transform.translate(event.x, event.y);
            this.background.transform.translate(event.x, event.y);
        });

        this.element.addEventListener('wheel', event => {
            const delta = 0.1 * Math.sign(event.deltaY);
            const workspaceDimensions = this.workspace.element.getBoundingClientRect();
            const ox = (workspaceDimensions.left - event.clientX);
            const oy = (workspaceDimensions.top - event.clientY);
            this.workspace.transform.scaleAround(ox, oy, delta);

            const backgroundDimensions = this.background.element.getBoundingClientRect();
            const ox2 = (backgroundDimensions.left - event.clientX);
            const oy2 = (backgroundDimensions.top - event.clientY);
            this.background.transform.scaleAround(ox2, oy2, delta);
        });
    }

}