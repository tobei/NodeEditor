import Transform2 from "./transform2.js";

export default class BackgroundUI {

    constructor(editorUI) {
        this.editorUI = editorUI;
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.background = 'url(./background.svg)';
        this.element.style.zIndex = '-1';
        this.editorUI.element.appendChild(this.element);
        this.transform = new Transform2(this.element, this.editorUI.element, 80);
        this.transform.on('transform', event => event.transform.apply(this.element));

        this.editorUI.on('translate', event => this.transform.translate(event.x, event.y));
        this.editorUI.on('scale', event => {
            const bounds = this.element.getBoundingClientRect();
            const ox = (bounds.left - event.x);
            const oy = (bounds.top - event.y);
            this.transform.scaleAround(ox, oy, event.delta);
        });
    }

}