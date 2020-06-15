export default class ConnectionManagerUI {

    constructor(workspaceUI) {
        this.workspaceUI = workspaceUI;

        this.currentTask = null;

        this.workspaceUI.editorUI.element.addEventListener('pointerup', event => {
            this.currentTask = null;
            console.log('CM : cancelling connection operation, destroying'); //TODO destroy the detached or temporary connection
        });
    }


    monitor(nodeUI) {
        nodeUI.on('createConnection', event => {
            this.currentTask = {sourceSocket: event.sourceSocket};
            console.log('CM: create temporary connection')

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