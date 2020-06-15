import Emitter from "../event/emitter.js";

export default class SocketUI extends Emitter {


    constructor(node, type, input) {
        super();
        this.node = node;
        this.connections = new Set();
        this.element = document.createElement('span');
        this.element.classList.add('socket');
        this.element.classList.add(input ? 'input': 'output');

        this.element.addEventListener('pointerdown', event => {
            event.stopPropagation();
            event.preventDefault();

            if (input) {
                this.node.emit('detachConnection', {connection: null});
            } else {
                this.node.emit('createConnection', {sourceSocket : this});
            }
        });


        this.element.addEventListener('pointerup', event => {
            event.stopPropagation();
            if (input) {
                this.node.emit('completeConnection', {destinationSocket: this});
            }
        });

    }

    getCoordinates() {
        return {x: this.node.transform.translateX + this.element.offsetLeft, y: this.node.transform.translateY + this.element.offsetTop};
    }

}