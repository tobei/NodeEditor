import Emitter from "../event/emitter.js";
import WorkspaceUI from "./workspaceui.js";
import DragManager from "./dragmanager.js";
import BackgroundUI from "./backgroundui.js";

export default class EditorUI extends HTMLElement {
    constructor() {
        super();
        this.events = new Emitter('translate', 'scale');
        this.attachShadow({mode: 'open'});
        this.workspace = new WorkspaceUI(this);
        this.background = new BackgroundUI(this);

        this.addEventListener('click', event => {
            if (event.target === this) {
                this.workspace.deselectNodes();
            }
        });

        this.dragManager = new DragManager();
        this.dragManager.monitor(this, 1);
        this.dragManager.on('dragMove', event => this.events.emit('translate', {x: event.x, y: event.y}));
        this.addEventListener('wheel', event => this.events.emit('scale', {x: event.clientX, y: event.clientY, delta: 0.1 * Math.sign(event.deltaY)}));

    }

}