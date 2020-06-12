import Emitter from "../event/emitter.js";
import DragManager from "./dragmanager.js";

export default class EditorUI extends Emitter {


    constructor(element) {
        super();
        this.element = element;
        this.selectedNodes = new Set(); //TODO selection manager
        this.dragManager = new DragManager(this.element);

        this.element.addEventListener('click', event => {
            if (event.target === this.element) {
                this._deselectNodes();
            }
        });


        this.dragManager.on('dragMove', event => {
            this.selectedNodes.forEach(node => node.move(event.x, event.y));
        });
    }

    addNode(nodeUI) {
        this.dragManager.monitor(nodeUI);
        nodeUI.on('nodeSelected', event => {
            if (this.selectedNodes.has(event.node)) return;
            if (! event.multiSelection) {
                this._deselectNodes();
            }
            this._selectNode(event.node);
        });

        this.element.appendChild(nodeUI.element);
    }

    _deselectNodes() {
        for (const node of this.selectedNodes) {
            node.deselect();
            this.selectedNodes.delete(node);
        }
    }

    _selectNode(node) {
        node.select();
        this.selectedNodes.add(node);
    }

}