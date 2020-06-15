import Emitter from "../event/emitter.js";
import Transform from "./transform.js";
import SocketUI from "./socketui.js";

export default class NodeUI extends Emitter {

    //TODO element should probably be created inside
    constructor(node, title) {
        super('nodeSelected', 'createConnection', 'completeConnection', 'detachConnection');
        this.node = node;
        this.element = document.createElement('div');
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
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = title;
        this.element.appendChild(titleElement);

        this.outputsElement = document.createElement('div');
        this.outputsElement.classList.add('outputs');
        this.element.appendChild(this.outputsElement);

        this.inputsElement = document.createElement('div');
        this.inputsElement.classList.add('inputs');
        this.element.appendChild(this.inputsElement);

    }

    select() {
        this.element.classList.add('selected');
    }

    deselect() {
        this.element.classList.remove('selected');
    }

    move(deltaX, deltaY) {
        this.transform.translate(deltaX, deltaY);
    }

    createInput(name, key) {
         const inputElement = document.createElement('div');
        inputElement.classList.add('input');

        const nameElement = document.createElement('span');
        nameElement.classList.add('name');
        nameElement.textContent = name;
        inputElement.appendChild(nameElement);

        const socket = new SocketUI(this, null, true);
        inputElement.appendChild(socket.element);

        this.inputsElement.appendChild(inputElement);
    }


    createOutput(name, key) {
        const outputElement = document.createElement('div');
        outputElement.classList.add('output');

        const nameElement = document.createElement('span');
        nameElement.classList.add('name');
        nameElement.textContent = name;
        outputElement.appendChild(nameElement);

        const socket = new SocketUI(this, null, false);
        outputElement.appendChild(socket.element);

        this.outputsElement.appendChild(outputElement);
    }
}