import Emitter from "../event/emitter.js";

export default class SocketUI extends Emitter {


    constructor(type, input) {
        super();
        this.connections = new Set();
        this.element = document.createElement('span');
        this.element.classList.add('socket');
        this.element.classList.add(input ? 'input': 'output');

        this.element.addEventListener('pointerdown', event => {
            event.stopPropagation();
            event.preventDefault();

            if (input) {
                console.log('picking existing connection target');
            } else {
                console.log('start dragging a connection');
            }
        });


        this.element.addEventListener('pointerup', event => {
            event.stopPropagation();
            if (input) {
                console.log('complete a connection if it was not dropped');
            }
        });


    }

}