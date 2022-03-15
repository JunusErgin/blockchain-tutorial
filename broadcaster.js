class Broadcaster {
    constructor() {
        this.functions = [];
    }

    subscribe(fun) {
        this.functions.push(fun);
    }

    notify(message) {
        this.functions.forEach(fun => fun(message));
    }
}

let broadcaster = new Broadcaster();
let newTransaction = new Broadcaster();