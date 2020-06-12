import Emitter from "../event/emitter.js";
import DragManager from "./dragmanager.js";

export default class EditorUI extends Emitter {


    constructor(viewportElement) {
        super();

        this.viewportElement = viewportElement;

        this.workspaceElement = document.createElement('div');
        this.viewportElement.appendChild(this.workspaceElement);

        this.selectedNodes = new Set(); //TODO selection manager
        this.nodeDragManager = new DragManager(this.viewportElement);
        this.editorDragManager = new DragManager(this.viewportElement);
        this.editorDragManager.monitor(this.viewportElement, 1);

        this.position = {x:0, y:0, z:1};

        this.viewportElement.addEventListener('click', event => {
            if (event.target === this.viewportElement) {
                this._deselectNodes();
            }
        });


        this.nodeDragManager.on('dragMove', event => {
            this.selectedNodes.forEach(node => node.move(event.x / this.position.z, event.y / this.position.z));
        });

        this.editorDragManager.on('dragMove', event => {
            this.position.x += event.x;
            this.position.y += event.y;

            this._updateTransformation();
        });

        this.viewportElement.addEventListener('wheel', event => {
            console.log(event.deltaY);

            this.position.z -= (event.deltaY / 2000.0);
            this.position.z = Math.min(Math.max(this.position.z, 0.5), 2.0);

            this._updateTransformation();
        });
    }

    addNode(nodeUI) {
        this.nodeDragManager.monitor(nodeUI.element);
        nodeUI.on('nodeSelected', event => {
            if (this.selectedNodes.has(event.node)) return;
            if (! event.multiSelection) {
                this._deselectNodes();
            }
            this._selectNode(event.node);
        });

        this.workspaceElement.appendChild(nodeUI.element);
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

    _updateTransformation() {
        this.workspaceElement.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.position.z})`;
    }

}