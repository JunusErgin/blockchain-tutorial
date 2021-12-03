class MiningNode {

    isMining = false;
    currentBlock;

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.DEFAULT_DATA = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };

        broadcaster.subscribe((nodeID) => {
            console.log('Nachricht empfangen:', nodeID);
            if (nodeID !== this.id) {
                this.killCurrentBlock();
            }
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
    }

    async mine() {
        this.currentBlock = new Block(Date.now(), this.DEFAULT_DATA);
        await blockchain.addBlock(this.currentBlock, this.id);
        if (this.isMining) {
            this.mine();
        }
    }
}