import TiledTransform from "./tiledtransform.js";

export default class BackgroundUI {

    constructor(editorUI) {
        this.editorUI = editorUI;
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.background = 'url(./img/background.svg)';
        this.element.style.zIndex = '-1';
        this.editorUI.shadowRoot.appendChild(this.element);
        this.transform = new TiledTransform(this.element, this.editorUI, 80);
        window.addEventListener('resize', event => this.transform.updateDimensions());

        this.transform.on('transform', event => event.transform.apply(this.element));

        this.editorUI.events.on('translate', event => this.transform.translate(event.x, event.y));
        this.editorUI.events.on('scale', event => {
            const bounds = this.element.getBoundingClientRect();
            const centerX = (bounds.left - event.x);
            const centerY = (bounds.top - event.y);
            this.transform.scaleAround(centerX, centerY, event.delta);
        });
    }

}