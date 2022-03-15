class MiningNode {

    isMining = false;
    currentBlock;

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
        renderCurrentTransactions(this.blockData.transactions);
        broadcaster.subscribe((nodeID) => {
            console.log('Nachricht empfangen:', nodeID);
            if (nodeID !== this.id) {
                this.killCurrentBlock();
            }
        });

        newTransaction.subscribe((transaction) => {
            this.blockData.transactions.push(transaction);
            renderCurrentTransactions(this.blockData.transactions);
        });
    }

    toggle() {
        this.isMining = !this.isMining;
        if (this.isMining) {
            this.mine();
        } else {
            this.killCurrentBlock();
        }
    }

    killCurrentBlock() {
        if (this.currentBlock) {
            this.currentBlock.kill = true;
        }
        this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
    }

    async mine() {
        renderCurrentTransactions(this.blockData.transactions);
        this.currentBlock = new Block(Date.now(), this.blockData);
        await blockchain.addBlock(this.currentBlock, this.id);
        if (this.isMining) {
            this.blockData = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };
            this.mine();
        }
    }
}