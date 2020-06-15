import Transform from "./transform.js";
import DragManager from "./dragmanager.js";
import ConnectionManagerUI from "./connectionmanagerui.js";

export default class WorkspaceUI {

    constructor(editorUI) {
        this.editorUI = editorUI;
        this.element = document.createElement('div');
        this.connectionManager = new ConnectionManagerUI(this); //TODO create connectionManager (should perhaps listen to pointerUp from EditorUI.

        this.editorUI.element.appendChild(this.element);

        this.transform = new Transform(0, 0, 1);
        this.transform.on('transform', event => event.transform.apply(this.element));

        this.nodeDragManager = new DragManager(this.element);
        this.selectedNodes = new Set();

        this.nodeDragManager.on('dragMove', event => {
            const workspaceDistance = this.transform.asLocalDistance(event.x, event.y);
            this.selectedNodes.forEach(node => node.move(workspaceDistance.x, workspaceDistance.y));
        });

        this.editorUI.on('translate', event => this.transform.translate(event.x, event.y));
        this.editorUI.on('scale', event => {
            const bounds = this.element.getBoundingClientRect();
            const ox = (bounds.left - event.x);
            const oy = (bounds.top - event.y);
            this.transform.scaleAround(ox, oy, event.delta);
        });
    }

    addNode(nodeUI) {
        this.nodeDragManager.monitor(nodeUI.element);
        nodeUI.on('nodeSelected', event => {
            if (this.selectedNodes.has(event.node)) return;
            if (! event.multiSelection) {
                this.deselectNodes();
            }
            this.selectNode(event.node);
        });
        this.connectionManager.monitor(nodeUI);
        this.element.appendChild(nodeUI.element);
    }

    deselectNodes() {
        for (const node of this.selectedNodes) {
            node.deselect();
            this.selectedNodes.delete(node);
        }
    }

    selectNode(node) {
        node.select();
        this.selectedNodes.add(node);
    }

}