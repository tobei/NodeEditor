import Emitter from "../event/emitter.js";

export default class NodeUI extends Emitter {


    constructor(editorUI, node, element) {
        super('nodeSelected');
        this.editorUI = editorUI;
        this.element = element;
        this.node = node;
        this.position = {x:0, y:0};

        this.element.classList.add('node');
        this.element.style.position = 'absolute';

        this.element.addEventListener('pointerdown', event => {
            event.stopPropagation();
            if (event.button !== 0) return;
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

    move(deltaX, deltaY) {
        this.position.x += deltaX;
        this.position.y += deltaY;
        this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }





}