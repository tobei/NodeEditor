import Emitter from "../event/emitter.js";
import ConnectionUI from "./connectionui.js";

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
                const connection = this.connections.values().next().value;
                console.log(connection);
                if (connection) {
                    connection.detach();
                    this.node.emit('detachConnection', {connection: connection});
                }
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
        const dimensions = this.element.getBoundingClientRect();
        return {x: this.node.transform.translateX + this.element.offsetLeft + dimensions.width / 2, y: this.node.transform.translateY + this.element.offsetTop + dimensions.height / 2};
    }

}