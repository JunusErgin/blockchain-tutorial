const DEFAULT_DATA = { transactions: [{ from: 'BlockReward', to: this.name, amount: 5 }] };

class MiningNode {

    isMining = false;
    currentBlock;

    constructor(id) {
        this.id = id;
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
        this.currentBlock = new Block(Date.now(), DEFAULT_DATA);
        await blockchain.addBlock(this.currentBlock, this.id);
        if (this.isMining) {
            this.mine();
        }
    }
}