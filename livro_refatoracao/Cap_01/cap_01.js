let plays = {
    "hamlet": { "name": "Hamlet", "type": "tragedy" },
    "as-like": { "name": "As You Like It", "type": "comedy" },
    "othello": { "name": "Othello", "type": "tragedy" },
}

let fatura = {
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

function statement(fatura, plays) {
    let totalQuantia = 0;
    let volumeCreditos = 0;
    let result = `Statement for ${fatura.customer}\n`;

    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

    for (let desempenho of fatura.performances) {
        volumeCreditos = volumeCreditosPara(desempenho);
        //exibe a linha para estar requisição
        result += ` ${jogarPara(desempenho).name}: ${format(valorPara(desempenho) / 100)} (${desempenho.audience}) seats\n`;
        totalQuantia += valorPara(desempenho);
    }

    result += `Amount owed is ${format(totalQuantia / 100)}\n`;
    result += `You earned ${volumeCreditos} credits\n`;
    return result;
}

function valorPara(aPerfomance) {
    let estaQuantia = 0;

    switch (jogarPara(aPerfomance).type) {
        case "tragedy":
            estaQuantia = 40000;
            if (aPerfomance.audience > 30) {
                estaQuantia += 1000 * (aPerfomance.audience - 30);
            }
            break;
        case "comedy":
            estaQuantia = 30000;
            if (aPerfomance.audience > 20) {
                estaQuantia += 10000 + 500 * (aPerfomance.audience - 20);
            }

            estaQuantia += 300 * aPerfomance.audience;
            break;
        default:
            throw new Error(`unknow type: ${jogarPara(aPerfomance).type}`);
            break;
    }

    return estaQuantia;
}

function jogarPara(aPerfomance) {
    return  plays[aPerfomance.playID];
}

function volumeCreditosPara(aPerfomance){
    let result = 0;

    //soma créditos por volume
    result += Math.max(aPerfomance.audience - 30, 0);
    //soma de crédito extra para cada dez espectadores de comédia
    if ("comedy" === jogarPara(aPerfomance).type) result += Math.floor(aPerfomance.audience / 5);

    return result;   
}
 
console.log(statement(fatura, plays));
