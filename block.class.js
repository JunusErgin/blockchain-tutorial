class Block {
    constructor(time = Date.now(), data = {}) {
        this.time = time;
        this.data = data;
        this.lastHash = '';
        this.nonce = 0;
        this.difficulty = '0';
        this.kill = false;
    }

    createHash() {
        // 78d6371b0dbc06502081d562681a2728b9a845ea7d3ca2b2aecc580bc7ec6218
        return sha256(this.nonce + this.lastHash + this.time + JSON.stringify(this.data));
    }

    mine() {
        let hash = this.createHash();
        return new Promise((resolve, reject) => {
            let i = setInterval(() => {
                if (this.kill) {
                    clearInterval(i);
                    reject();
                } else if (hash.startsWith(this.difficulty)) {
                    clearInterval(i);
                    resolve();
                } else {
                    this.nonce++;
                    hash = this.createHash();
                }
            }, 1000 / 30);
        });
    }

    mineOld() {
        let hash = this.createHash();
        while (!hash.statsWith(this.difficulty)) {
            this.nonce++;
            hash = this.createHash();
        }
    }
}