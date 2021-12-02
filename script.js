let node0 = new MiningNode(0);
let node1 = new MiningNode(1);
let blockchain = new Blockchain();


function startNode0() {
    log('Toggle Node 0');
    n0.classList.toggle('pause-btn');
    node0.toggle();
}

function startNode1() {
    log('Toggle Node 1');
    n1.classList.toggle('pause-btn');
    node1.toggle();
}

function log(text) {
    let hours = ('0' + new Date().getHours()).slice(-2);
    let minutes = ('0' + new Date().getMinutes()).slice(-2);
    logs.innerHTML += `<div class="mb-16">
    <code>
    <i>${hours}:${minutes}</i> ${text}
</code></div>`;
}