import Emitter from "../event/emitter.js";
import WorkspaceUI from "./workspaceui.js";
import DragManager from "./dragmanager.js";
import BackgroundUI from "./backgroundui.js";

export default class EditorUI extends Emitter {
    constructor(viewportElement) {
        super('translate', 'scale');
        this.element = viewportElement;
        this.workspace = new WorkspaceUI(this);
        this.background = new BackgroundUI(this);

        this.element.addEventListener('click', event => {
            if (event.target === this.element) {
                this.workspace.deselectNodes();
            }
        });

        this.dragManager = new DragManager(this.element);
        this.dragManager.monitor(this.element, 1);
        this.dragManager.on('dragMove', event => this.emit('translate', {x: event.x, y: event.y}));
        this.element.addEventListener('wheel', event => this.emit('scale', {x: event.clientX, y: event.clientY, delta: 0.1 * Math.sign(event.deltaY)}));
    }

}