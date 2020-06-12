export default class Emitter {


    constructor(...eventNames) {
        this.eventHandlers = new Map();
        eventNames.forEach(name => this.eventHandlers[name] = new Set());
    }


    //TODO: later should return an unsubscribe function
    on(eventNames, handlerFunction) {
        for (const eventName of eventNames.split(' ')) {
            if (!this.eventHandlers[eventName]) throw "Can only listen to registered event";
            this.eventHandlers[eventName].add(handlerFunction);
        }
    }

    emit(eventName, event) {
        if (!this.eventHandlers[eventName]) throw "Can only emit registered event";
        this.eventHandlers[eventName].forEach(handleFunction => handleFunction(event));
    }

}