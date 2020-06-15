import Emitter from "../event/emitter.js";

export default class ConnectionUI extends Emitter {

    constructor(originSocket, destinationSocket) {
        super();
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';

        this.originSocket = originSocket;
        this.destinationSocket = destinationSocket;
    }

    _draw(originPoint, destinationPoint) {

    }

    _createPathNode() {


    }

}