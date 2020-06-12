export default class Emitter {


    constructor() {
        this.eventHandlers = new Map();
        this.eventHandlers['nodeSelected'] = new Set();
        this.eventHandlers['nodeDragStarted'] = new Set();
    }


    //TODO: later should return an unsubscribe function
    on(eventNames, handlerFunction) {
        for (const eventName of eventNames.split(' ')) {
            this.eventHandlers[eventName].add(handlerFunction);
        }
    }

    emit(eventName, event) {
        for (const handlerFunction of this.eventHandlers[eventName]) {
            handlerFunction(event);
        }
    }

}