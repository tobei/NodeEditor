import Emitter from "../event/emitter.js";
import Transform from "./transform.js";

export default class NodeUI extends Emitter {


    constructor(editorUI, node, element) {
        super('nodeSelected');
        this.editorUI = editorUI; //TODO maybe not needed, consider workspace or workspace.transform instead
        this.element = element;
        this.node = node;
        this.transform = new Transform(0, 0, 1);
        this.transform.on('transform', event => event.transform.apply(this.element));

        this.element.classList.add('node');
        this.element.style.position = 'absolute';

        this.element.addEventListener('pointerdown', event => {
            if (event.button !== 0) return;
            event.stopPropagation();
            this.select();
            this.emit('nodeSelected', {node: this, multiSelection: event.ctrlKey || event.shiftKey});
        });

    }


    select() {
        this.element.classList.add('selected');
    }

    deselect() {
        this.element.classList.remove('selected');
    }

    //TODO adjust for workspace transform (scaling)
    move(deltaX, deltaY) {
        this.transform.translate(deltaX, deltaY);
    }





}