import fs from 'fs';
import readline from 'readline';

async function main() {
    const fileStream = fs.createReadStream("input");
    let rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let grid: String[] = [];

    for await (let line of rl) {
        line = line.trim();
        grid.push(line);
    }

    const m = grid.length;
    const n = grid[0].length;
    const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let start = -1;
    let dest = -1;
    const from: number[][] = [];
    for (let i = 0; i < m * n; i++) {
        from.push([]);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const pos = i * n + j;
            let curChar = grid[i][j];
            if (curChar === 'S') {
                curChar = 'a'; 
                start = pos;
            }
            if (curChar === 'E') {
                curChar = 'z'; 
                dest = pos;
            }
            for (let k = 0; k < 4; k++) {
                const ni = i + dir[k][0];
                const nj = j + dir[k][1];
                if (ni < 0 || ni >= m || nj < 0 || nj >= n) continue;
                const toPos = ni * n + nj;
                let toChar = grid[ni][nj];
                if (toChar === 'S') toChar = 'a';
                if (toChar === 'E') toChar = 'z';
                if (curChar.charCodeAt(0) + 1 < toChar.charCodeAt(0)) continue;
                from[pos].push(toPos);
            }
        }
    }

    const INF = 1000000000000000;
    let dp: number[] = [];
    for (let i = 0; i < m * n; i++) {
        dp.push(INF);
    }

    // Part 2, multi source
    let se = new Set<number[]>();
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 'a' || grid[i][j] === 'S') {
                dp[i * n + j] = 0;
                se.add([0, i * n + j]);
            }
        }
    }

    while (se.size > 0) {
        const [now] = se;
        const v = now[1];
        se.delete(now);
        for (let i = 0; i < from[v].length; i++) {
            if (dp[v] + 1 < dp[from[v][i]]) {
                se.delete([dp[from[v][i]], from[v][i]]);
                dp[from[v][i]] = dp[v] + 1;
                se.add([dp[from[v][i]], from[v][i]]);
            }
        }
    }
    // console.log(dp);

    console.log(dp[dest]);
}

main();
