class Blockchain {
    constructor() {
        this.chain = [];
    }

    async addBlock(block, nodeID) {
        let lb = this.getLastBlock();
        block.data.moneyTable = lb ? lb.data.moneyTable : [];
        block.lastHash = lb ? lb.createHash() : '';
        try {
            await block.mine();
            broadcaster.notify(nodeID);
            this.chain.push(Object.freeze(block));
            log(`Node ${nodeID} hat den Block gefunden! (${this.chain.length} Blocks insgesamt)`);
        } catch (e) {
            console.log(e);
        }
    }

    isValid() {
        let invalidBlock = this.chain.find((currBlock, i) => {
            let prevBlock = this.chain[i - 1];
            return prevBlock && prevBlock.createHash() != currBlock.lastHash;
        });
        if (invalidBlock) {
            return true;
        } else {
            return false;
        }
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
}