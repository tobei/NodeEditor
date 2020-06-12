import Emitter from "../event/emitter.js";

export default class DragManager extends Emitter {

    constructor(referenceElement) {
        super('dragMove');
        this.dragReferencePoint = null;
        this.referenceElement = referenceElement;

        this.referenceElement.addEventListener('pointermove', event => {
            if (!this.dragReferencePoint) return;

            const deltaX = event.clientX - this.dragReferencePoint.x;
            const deltaY = event.clientY - this.dragReferencePoint.y;

            this.dragReferencePoint.x = event.clientX;
            this.dragReferencePoint.y = event.clientY;

            this.emit('dragMove', {x: deltaX, y: deltaY});
        });

        this.referenceElement.addEventListener('pointerup', event => this.dragReferencePoint = null);

    }

    monitor(draggableElement) {
        draggableElement.addEventListener('pointerdown', event => {
            event.preventDefault()
            this.dragReferencePoint = {x: event.clientX, y: event.clientY};
        });
    }

}