import Transform from "./transform.js";
import DragManager from "./dragmanager.js";

export default class WorkspaceUI {

    constructor(editorUI) {
        this.editorUI = editorUI;
        this.element = document.createElement('div');
        this.editorUI.viewportElement.appendChild(this.element);

        this.transform = new Transform(0, 0, 1);
        this.transform.on('transform', event => event.transform.apply(this.element));

        this.nodeDragManager = new DragManager(this.element);
        this.selectedNodes = new Set();

        this.nodeDragManager.on('dragMove', event => {
            const workspaceDistance = this.transform.asLocalDistance(event.x, event.y);
            this.selectedNodes.forEach(node => node.move(...workspaceDistance));
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