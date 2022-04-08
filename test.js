const { Block } = require('./block.class');
const { Blockchain } = require('./blockchain.class');

console.log('Creating blockchain');
let jChain = new Blockchain();
let block1 = new Block(Date.now(), { 'junus': 100, 'manu': 50 });
jChain.addBlock(block1);

let block2 = new Block(Date.now(), { 'junus': 80, 'manu': 70 });

jChain.addBlock(block2);

block1.data = { 'junus': 180, 'manu': 70 };

console.log(jChain.chain);

console.log('Is Blockchain valid?', jChain.isValid());
console.log('Neuer Hash von block 1', block1.createHash());
