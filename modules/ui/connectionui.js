import Emitter from "../event/emitter.js";

export default class ConnectionUI extends Emitter {

    constructor(sourceSocket, destinationSocket) {
        super();

        this.sourceSocket = sourceSocket;
        this.destinationSocket = destinationSocket;

        this._createElement();
    }

    update(destinationPoint) {
        const sourceCoordinates = this.sourceSocket.getCoordinates();
        this.path.setAttribute('d', this._createPathString(sourceCoordinates.x, sourceCoordinates.y, destinationPoint.x, destinationPoint.y));
    }

    complete(destinationSocket) {
        this.destinationSocket = destinationSocket;
        //TODO calculate destination point
    }


    _createElement(originSocket) {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.zIndex = -1;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        svg.classList.add('connection');
        this.path.classList.add('main-path');

        svg.appendChild(this.path);
        this.element.appendChild(svg);

        this.update(this.sourceSocket.getCoordinates(), this.sourceSocket.getCoordinates());
    }

    _createPathString(x1, y1, x2, y2) {
        const midx = x1 + (x2 - x1) / 2.0;
        return `M ${x1} ${y1} C ${midx} ${y1} ${midx} ${y2} ${x2} ${y2}`;
    }

}