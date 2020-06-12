import Emitter from "../event/emitter.js";

export default class EditorUI extends Emitter {


    constructor(element) {
        super();
        this.element = element;
        this.selectedNodes = new Set();
        this.dragReferencePoint = null; //TODO: move into a drag manager

        this.element.addEventListener('click', event => {
            if (event.target === this.element) {
                this._deselectNodes();
            }
        });

        this.element.addEventListener('pointermove', event => {
            if (this.dragReferencePoint) {
                const deltaX = event.clientX - this.dragReferencePoint.x;
                const deltaY = event.clientY - this.dragReferencePoint.y;
                for (const selectedNode of this.selectedNodes) {
                    selectedNode.move(deltaX, deltaY);
                }
                this.dragReferencePoint.x += deltaX;
                this.dragReferencePoint.y += deltaY;
            }
        });

        this.element.addEventListener('pointerup', event => {
            this.dragReferencePoint = null;
        });
    }

    addNode(nodeUI) {
        //TODO: move into drag behavior
        nodeUI.on('nodeDragStarted', event => {
            this.dragReferencePoint = {x: event.clientX, y: event.clientY};
        });
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