import Emitter from "../event/emitter.js";

export default class Transform extends Emitter {

    //TODO probably add a parent transform so Node transform can refer to Workspace transform
    constructor(translateX, translateY, scaleFactor) {
        super('transform');
        this.translateX = translateX;
        this.translateY = translateY;
        this.scaleFactor = scaleFactor;
    }

    translate(deltaX, deltaY) {
        this.translateX += deltaX;
        this.translateY += deltaY;
        this.emit('transform', {transform: this});
    }

    scaleAround(centerX, centerY, scaleDelta) {
        const currentScale = this.scaleFactor;
        const newScale =  Math.max(Math.min(currentScale + scaleDelta, 3), 0.5);
        const ratio = 1 - (newScale / currentScale);



        this.translateX -= centerX * ratio;
        this.translateY -= centerY * ratio;
        this.scaleFactor = newScale;

        this.emit('transform', {transform: this});
    }

    asLocalDistance(globalDistanceX, globalDistanceY) {
        return [globalDistanceX / this.scaleFactor, globalDistanceY / this.scaleFactor];
    }

    apply(htmlElement) {
        htmlElement.style.transformOrigin = '0 0';
        htmlElement.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scaleFactor})`;
    }
}