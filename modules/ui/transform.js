import Emitter from "../event/emitter.js";

export default class Transform extends Emitter {

    //TODO probably add a parent transoform so Node transofmr can refer to Workspace transoform
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
        const newScale =  currentScale + scaleDelta;
        const ratio = 1 - (newScale / currentScale);

        if (newScale < 0.3 || newScale > 4) return;

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