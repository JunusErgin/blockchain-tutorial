class Block {
    constructor(time = Date.now(), data = {}) {
        this.time = time;
        this.data = data;
        this.lastHash = '';
        this.nonce = 0;
        this.difficulty = '00';
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
                    this.resolveTransactions();
                    resolve();
                } else {
                    this.nonce++;
                    hash = this.createHash();
                }
            }, 1000 / 30);
        });
    }

    resolveTransactions() {
        let transactions = this.data.transactions;
        transactions.forEach(transaction => {
            this.addMoney(transaction.from, transaction.to, transaction.amount);
        });
    }

    addMoney(sender, receiver, amount) {
        let moneyTable = this.data.moneyTable || [];
        let entry = moneyTable.find(e => e.name == receiver);
        if (!entry) {
            entry = { name: receiver, amount: 0 };
            moneyTable.push(entry);
        }

        if (sender != 'BlockReward') {
            let entrySender = moneyTable.find(e => e.name == sender);
            if (!entrySender) {
                entrySender = { name: receiver, amount: 0 };
                moneyTable.push(entrySender);
            }
            entrySender.amount -= amount;
        }

        entry.amount += amount;
        console.log('UPDATED TABLE', moneyTable);
        this.data.moneyTable = moneyTable;
        updateGraphData(moneyTable);
    }

    mineOld() {
        let hash = this.createHash();
        while (!hash.statsWith(this.difficulty)) {
            this.nonce++;
            hash = this.createHash();
        }
    }
}