import Emitter from "../event/emitter.js";

export default class DragManager extends Emitter {

    constructor() {
        super('dragMove');
        this.dragReferencePoint = null;
        window.addEventListener('pointermove', event => {
            if (!this.dragReferencePoint) return;

            const deltaX = event.clientX - this.dragReferencePoint.x;
            const deltaY = event.clientY - this.dragReferencePoint.y;

            this.dragReferencePoint.x = event.clientX;
            this.dragReferencePoint.y = event.clientY;

            this.emit('dragMove', {x: deltaX, y: deltaY});
        });

        window.addEventListener('pointerup', event => this.dragReferencePoint = null);
    }

    monitor(draggableElement, button = 0) {
        draggableElement.addEventListener('pointerdown', event => {
            event.preventDefault();
            if (event.button !== button) return;
            this.dragReferencePoint = {x: event.clientX, y: event.clientY};
        });
    }

}