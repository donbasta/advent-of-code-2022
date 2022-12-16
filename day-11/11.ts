import fs from 'fs';
import readline from 'readline';

interface Config {
    operator: string,
    operand: bigint,
    ifTrue: number,
    ifFalse: number,
    divisibleBy: bigint,
}

function GCD(a: bigint, b: bigint): bigint {
    if (a < b) {
        const tmp = a;
        a = b;
        b = tmp;
    }
    while (b > 0) {
        const tmp = a;
        a = b;
        b = tmp % b;
    }
    return a;
}

function LCM(a: bigint, b: bigint): bigint {
    return a / GCD(a, b) * b;
}

async function main() {
    const fileStream = fs.createReadStream("input");
    let rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let items: bigint[][] = [];
    let inspects: number[] = [];
    let configs: Config[] = [];

    let operator: string = '😊';
    let operand: bigint = BigInt(-10);
    let ifTrue: number = 0;
    let ifFalse: number = 0;
    let divisibleBy: bigint = BigInt(1);

    for await (let line of rl) {
        line = line.trim();
        if (line.length == 0) {
            configs.push({
                operator: operator,
                operand: operand,
                ifTrue: ifTrue,
                ifFalse: ifFalse,
                divisibleBy: divisibleBy,
            })
            continue;
        }
        const lineTokens = line.split(' ');
        const check = lineTokens[0];
        if (check === "Starting") {
            let tmp: bigint[] = [];
            for (let i = 2; i < lineTokens.length; i++) {
                let numString = lineTokens[i];
                if (numString[-1] === ",") {
                    numString = numString.slice(0, -1);
                }
                tmp.push(BigInt(parseInt(numString)));
            }
            items.push(tmp);
        } else if (check === "Operation:") {
            operator = lineTokens[4];
            let secondOperand = lineTokens[5];
            if (secondOperand === "old") {
                operand = BigInt(-1);
            } else {
                operand = BigInt(parseInt(secondOperand));
            }
        } else if (check === "Test:") {
            divisibleBy = BigInt(parseInt(lineTokens[3]));
        } else if (lineTokens[1] === "true:") {
            ifTrue = parseInt(lineTokens[5])
        } else if (lineTokens[1] === "false:") {
            ifFalse = parseInt(lineTokens[5])
        }
    }
    configs.push({
        operator: operator,
        operand: operand,
        ifTrue: ifTrue,
        ifFalse: ifFalse,
        divisibleBy: divisibleBy,
    });

    let lcm: bigint = BigInt(configs[0].divisibleBy);
    for (let i = 1; i < items.length; i++) {
        lcm = LCM(lcm, configs[i].divisibleBy);
    }

    for (let i = 0; i < items.length; i++) {inspects.push(0);}

    // Part 1
    // const numRounds = 20;

    // Part 2
    const numRounds = 10000;

    for (let rounds = 0; rounds < numRounds; rounds++) {
        for (let monke = 0; monke < configs.length; monke++) {
            inspects[monke] += items[monke].length;
            for (let i = 0; i < items[monke].length; i++) {
                let a: bigint = BigInt(-10);
                if (configs[monke].operand === BigInt(-1)) {
                    if (configs[monke].operator === '+') {
                        a = items[monke][i] + items[monke][i];
                    } else if (configs[monke].operator === '*') {
                        a = items[monke][i] * items[monke][i];
                    }
                } else {
                    if (configs[monke].operator === '+') {
                        a = items[monke][i] + configs[monke].operand;
                    } else if (configs[monke].operator === '*') {
                        a = items[monke][i] * configs[monke].operand;
                    }
                }
                a %= lcm;
                // Part 1
                // a = Math.floor(a / 3);
                if (a % configs[monke].divisibleBy === BigInt(0)) {
                    items[configs[monke].ifTrue].push(a)
                } else {
                    items[configs[monke].ifFalse].push(a)
                }
            }
            items[monke] = [];
        }
        // if (rounds === 0 || rounds === 19 || rounds === 999 || rounds === 1999) {
        //     console.log(inspects);
        // }
    }

    console.log(inspects);    
    // console.log(inspects[0] * inspects[1]);
}

main();
