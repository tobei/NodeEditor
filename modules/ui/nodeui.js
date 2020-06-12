import Emitter from "../event/emitter.js";

export default class NodeUI extends Emitter {


    constructor(editorUI, node, element) {
        super();
        this.editorUI = editorUI;
        this.element = element;
        this.node = node;
        this.position = {x:0, y:0};

        this.element.classList.add('node');
        this.element.style.position = 'absolute';

        this.element.addEventListener('pointerdown', event => {
            event.stopPropagation();
            this.select();
            this.emit('nodeSelected', {node: this, multiSelection: event.ctrlKey});
            this.emit('nodeDragStarted', {clientX: event.clientX, clientY: event.clientY});
        });
    }


    select() {
        this.element.classList.add('selected');
    }

    deselect() {
        this.element.classList.remove('selected');
    }

    move(deltaX, deltaY) {
        console.log('move : ' + deltaX + ' ' + deltaY);
        this.position.x += deltaX;
        this.position.y += deltaY;

        this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }

    // * will fire event when selected (with boolean if single select or ctrl-select), deselect will be triggered by the editor
    // when a user clicks out
    // * will fire event optionally when deselected
    // * will fire event when starts being dragged (move commands will be triggered by the editor)




}