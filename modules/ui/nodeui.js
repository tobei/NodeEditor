import Emitter from "../event/emitter.js";
import Transform from "./transform.js";

export default class NodeUI extends Emitter {

    //TODO element should probably be created inside
    constructor(node, element, title) {
        super('nodeSelected');
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

    createInput(name, key, type) {
        const inputElement = document.createElement('div');
        inputElement.classList.add('input');
        inputElement.textContent = name;
        this.inputsElement.appendChild(inputElement);
    }


    createOutput(name, key, type) {
        const outputElement = document.createElement('div');
        outputElement.classList.add('output');
        outputElement.textContent = name;
        this.outputsElement.appendChild(outputElement);
    }
}