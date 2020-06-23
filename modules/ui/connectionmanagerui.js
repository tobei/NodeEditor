import ConnectionUI from "./connectionui.js";

export default class ConnectionManagerUI {

    constructor(workspaceUI) {
        this.workspaceUI = workspaceUI;

        this.currentTask = null;

        this.workspaceUI.editorUI.addEventListener('pointerup', event => {
            if (this.currentTask) {
                this.currentTask.connection.delete();
                this.currentTask = null;
                console.log('CM : cancelling connection operation, destroying'); //TODO destroy the detached or temporary connection
            }
        });

        this.workspaceUI.editorUI.addEventListener('pointermove', event => {
            if (this.currentTask) {
                const workspaceBounds = this.workspaceUI.element.getBoundingClientRect();
                const localCoordinates = this.workspaceUI.transform.asLocalDistance(event.clientX - workspaceBounds.left, event.clientY - workspaceBounds.top);
                this.currentTask.connection.updateDestination(localCoordinates);
            }
        });
    }


    monitor(nodeUI) {
        nodeUI.events.on('createConnection', event => {
            console.log('CM: create temporary connection')
            if (!this.currentTask) {
                const connection = new ConnectionUI(event.sourceSocket, null);
                this.currentTask = {connection: connection};
                this.workspaceUI.element.appendChild(connection.element);
            }
        });

        nodeUI.events.on('completeConnection', event => {
            if (this.currentTask) {
                const incomingConnections = event.destinationSocket.connections;
                for (const connection of incomingConnections) {
                    connection.delete();
                }
                this.currentTask.connection.complete(event.destinationSocket);
                console.log('CM: connection completed');
            }
            this.currentTask = null;
        });

        nodeUI.events.on('detachConnection', event => {
            if (!this.currentTask) {
                this.currentTask = {connection: event.connection};
                console.log('CM: detaching connection ' + event.connection);
            }
        });
    }

}