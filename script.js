let node0 = new MiningNode(0, 'Junus');
let node1 = new MiningNode(1, 'Manuel');
let blockchain = new Blockchain();
let CHART_DATA = {
    amounts: [0, 0, 0, 0, 0, 0],
    labels: ['', '', '', '', '', '']
};

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

function sendMoney() {
    console.log(from.value, to.value, amount.value);
    newTransaction.notify({
        from: from.value,
        to: to.value,
        amount: +amount.value
    });
}

function log(text) {
    let hours = ('0' + new Date().getHours()).slice(-2);
    let minutes = ('0' + new Date().getMinutes()).slice(-2);
    logs.innerHTML += `<div class="mb-16">
    <code>
    <i>${hours}:${minutes}</i> ${text}
</code></div>`;
}

function updateGraphData(moneyTable) {
    moneyTable.forEach((entry, index) => {
        CHART_DATA.amounts[index] = entry.amount;
        CHART_DATA.labels[index] = entry.name;
    });
    myChart.update();
}

function renderCurrentTransactions(transactions) {
    transactionContainer.innerHTML = '<h2>Transaktionen</h2>';
    transactions.forEach(ta => {
        transactionContainer.innerHTML +=
            `<div class="card mb-16">${ta.from} ➔ ${ta.to} $${ta.amount}</div>`;
    });

}