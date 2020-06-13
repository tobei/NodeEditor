import Transform from "./transform.js";


export default class Transform2 extends Transform {

    constructor(element, parent, tileDimension) {
        super(0 ,0 , 1);
        this.element = element;
        this.parent = parent;
        this.tileDimension = tileDimension;
        this.wrapSize = tileDimension * this.scaleFactor;

        this.updateDimensions();
    }


    updateDimensions() {
        this.wrapSize = this.scaleFactor * this.tileDimension;

        const parentDimensions = this.parent.getBoundingClientRect();
        this.element.style.width = `${(parentDimensions.width + 2 * this.wrapSize) / this.scaleFactor}px`;
        this.element.style.height = `${(parentDimensions.height + 2 * this.wrapSize) /this.scaleFactor}px`;

        this.element.style.left = `${-this.wrapSize}px`;
        this.element.style.top = `${-this.wrapSize}px`;
    }


    translate(deltaX, deltaY) {
        this.translateX = (this.translateX + deltaX) % this.wrapSize;
        this.translateY = (this.translateY + deltaY) % this.wrapSize;

        this.emit('transform', {transform: this});
    }

    scaleAround(centerX, centerY, scaleDelta) {
        const currentScale = this.scaleFactor;
        const newScale =  currentScale + scaleDelta;

        this.wrapSize = (this.scaleFactor + scaleDelta) * this.tileDimension;

        const parentDimensions = this.parent.getBoundingClientRect();
        this.element.style.width = `${(parentDimensions.width + 2 * this.wrapSize) / newScale}px`;
        this.element.style.height = `${(parentDimensions.height + 2 * this.wrapSize) / newScale}px`;

        this.element.style.left = `${-this.wrapSize}px`;
        this.element.style.top = `${-this.wrapSize}px`;

        const ratio = 1.0 - (newScale / currentScale);

        if (newScale < 0.1 || newScale > 5) return;

        this.translateX = (this.translateX - (centerX * ratio)) % this.wrapSize;
        this.translateY = (this.translateY - (centerY * ratio)) % this.wrapSize;
        this.scaleFactor = newScale;

        this.emit('transform', {transform: this});
    }


}