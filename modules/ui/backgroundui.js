import Transform2 from "./transform2.js";

export default class BackgroundUI {

    constructor(viewportElement) {
        this.viewportElement = viewportElement; //TODO attach resize events
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.background = 'url(./background.svg)';
        this.element.style.zIndex = '-1';
        this.viewportElement.appendChild(this.element);
        this.transform = new Transform2(this.element, viewportElement, 80);
        this.transform.on('transform', event => event.transform.apply(this.element));
    }

}