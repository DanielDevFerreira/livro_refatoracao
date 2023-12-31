let plays = {
    "hamlet": { "name": "Hamlet", "type": "tragedy" },
    "as-like": { "name": "As You Like It", "type": "comedy" },
    "othello": { "name": "Othello", "type": "tragedy" },
}

let invoice = {
    "customer": "BigCo",
    "performances": [
        {
            "playID": "hamlet",
            "audience": 55
        },
        {
            "playID": "as-like",
            "audience": 35
        },
        {
            "playID": "othello",
            "audience": 40
        }
    ]
};

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];

        //soma créditos por volume
        volumeCredits += Math.max(perf.audience - 30, 0);
        //soma de crédito extra para cada dez espectadores de comédia
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        //exibe a linha para estar requisição
        result += ` ${play.name}: ${format(anountFor(perf, play) / 100)} (${perf.audience}) seats\n`;
        totalAmount += anountFor(perf, play);
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

function anountFor(perf, play) {
    let thisAmount = 0;

    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }

            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknow type: ${play.type}`);
            break;
    }

    return thisAmount;
}

console.log(statement(invoice, plays));
