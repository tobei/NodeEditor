import ConnectionUI from "./connectionui.js";

export default class ConnectionManagerUI {

    constructor(workspaceUI) {
        this.workspaceUI = workspaceUI;

        this.currentTask = null;

        this.workspaceUI.editorUI.element.addEventListener('pointerup', event => {
            if (this.currentTask) {
                this.currentTask = null;
                console.log('CM : cancelling connection operation, destroying'); //TODO destroy the detached or temporary connection
            }
        });

        this.workspaceUI.editorUI.element.addEventListener('pointermove', event => {
            if (this.currentTask) {
                const workspaceBounds = this.workspaceUI.element.getBoundingClientRect();
                const localCoordinates = this.workspaceUI.transform.asLocalPosition(event.clientX - workspaceBounds.left, event.clientY - workspaceBounds.top);
                this.currentTask.connection.update(localCoordinates);
            }
        });
    }


    monitor(nodeUI) {
        nodeUI.on('createConnection', event => {
            console.log('CM: create temporary connection')
            const connectionUI = new ConnectionUI(event.sourceSocket);
            this.currentTask = {connection: connectionUI};
            this.workspaceUI.element.appendChild(connectionUI.element);
        });

        nodeUI.on('completeConnection', event => {
            if (this.currentTask) {
                this.currentTask.destinationSocket = event.destinationSocket;
                console.log('CM: connection completed');
            }
            this.currentTask = null;
        });

        nodeUI.on('detachConnection', event => {
            this.currentTask = {connection: event.connection};
            console.log('CM: detaching connection');
        });
    }

}