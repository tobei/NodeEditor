import Emitter from "../event/emitter.js";
import Transform from "./transform.js";
import SocketUI from "./socketui.js";

export default class NodeUI extends HTMLElement {

    constructor() {
        super();
        this.events = new Emitter('nodeSelected', 'createConnection', 'completeConnection', 'detachConnection');
        this.transform = new Transform(0, 0, 1);
        this.transform.on('transform', event => event.transform.apply(this));
        this.classList.add('node');
        this.style.position = 'absolute';
        this.addEventListener('pointerdown', event => {
            if (event.button !== 0) return;
            event.stopPropagation();
            this.select();
            this.events.emit('nodeSelected', {node: this, multiSelection: event.ctrlKey || event.shiftKey});
        });
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = this.dataset.name;
        this.appendChild(titleElement);

        this.outputsElement = document.createElement('div');
        this.outputsElement.classList.add('outputs');
        this.appendChild(this.outputsElement);

        this.inputsElement = document.createElement('div');
        this.inputsElement.classList.add('inputs');
        this.appendChild(this.inputsElement);

        this.sockets = new Set();
        this.move(this.dataset.x, this.dataset.y);

    }

    select() {
        this.classList.add('selected');
    }

    deselect() {
        this.classList.remove('selected');
    }

    move(deltaX, deltaY) {
        this.transform.translate(deltaX, deltaY);

        this.sockets.forEach(socket => {
            socket.connections.forEach(connection => connection.updatePosition());
        });
    }

    createInput(name, key) {
         const inputElement = document.createElement('div');
        inputElement.classList.add('input');

        const nameElement = document.createElement('span');
        nameElement.classList.add('name');
        nameElement.textContent = name;
        inputElement.appendChild(nameElement);

        const socket = new SocketUI(this, null, true);
        this.sockets.add(socket);
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
        this.sockets.add(socket);
        outputElement.appendChild(socket.element);

        this.outputsElement.appendChild(outputElement);
    }

    connectedCallback() {
        const event = new CustomEvent('nodeInserted', {detail: {node: this}});
        this.assignedSlot.dispatchEvent(event);
    }



}