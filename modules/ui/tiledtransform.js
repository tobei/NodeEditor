import Transform from "./transform.js";


export default class TiledTransform extends Transform {

    constructor(element, parent, tileDimension) {
        super(-tileDimension ,-tileDimension , 1);
        this.element = element;
        this.parent = parent;
        this.tileDimension = tileDimension;
        this.scaledTileDimension = tileDimension * this.scaleFactor;

        this.updateDimensions();
    }


    updateDimensions() {
        this.scaledTileDimension = this.scaleFactor * this.tileDimension;

        const parentDimensions = this.parent.getBoundingClientRect();
        this.element.style.width = `${(parentDimensions.width + 2 * this.scaledTileDimension) / this.scaleFactor}px`;
        this.element.style.height = `${(parentDimensions.height + 2 * this.scaledTileDimension) /this.scaleFactor}px`;
    }


    translate(deltaX, deltaY) {
        this.translateX = (this.translateX + deltaX) % this.scaledTileDimension - this.scaledTileDimension;
        this.translateY = (this.translateY + deltaY) % this.scaledTileDimension - this.scaledTileDimension;

        this.emit('transform', {transform: this});
    }

    scaleAround(centerX, centerY, scaleDelta) {
        const currentScale = this.scaleFactor;
        const newScale =  Math.max(Math.min(currentScale + scaleDelta, 3), 0.5);

        this.scaledTileDimension = newScale * this.tileDimension;

        const parentDimensions = this.parent.getBoundingClientRect();
        this.element.style.width = `${(parentDimensions.width + 2 * this.scaledTileDimension) / newScale}px`;
        this.element.style.height = `${(parentDimensions.height + 2 * this.scaledTileDimension) / newScale}px`;

        const ratio = 1.0 - (newScale / currentScale);


        this.translateX = (this.translateX - (centerX * ratio)) % this.scaledTileDimension - this.scaledTileDimension;
        this.translateY = (this.translateY - (centerY * ratio)) % this.scaledTileDimension - this.scaledTileDimension;
        this.scaleFactor = newScale;

        this.emit('transform', {transform: this});
    }


}