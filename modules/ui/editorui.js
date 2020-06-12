import Emitter from "../event/emitter.js";

export default class EditorUI extends Emitter {


    constructor(element) {
        super();
        this.element = element;
        this.selectedNodes = new Set();

        this.element.addEventListener('click', event => {
            if (event.target === this.element) {
                this._deselectNodes();
            }
        });
    }

    addNode(nodeUI) {
        nodeUI.on('nodeDragStarted', event => {});
        nodeUI.on('nodeSelected', event => {
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