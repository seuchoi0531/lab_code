let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").trim().split("\n");
let [n, m] = input[0].split(" ").map(Number);
let arr = [];
for (let i = 1; i <= n; i++)
    arr.push(input[i].split(" ").map(Number));
let dir = [];
dir.push([0, 0, 1, 1, 1, -1, -1, -1]);
dir.push([1, -1, 1, 0, -1, 1, 0, -1]);
let queue = [];
let queuepointer = 0;
let cnt = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        let flag = false;
        if (arr[i][j] === 1) {
            flag = true;
            queue.push([i, j]);
            arr[i][j] = 0;
            while (queue.length > queuepointer && queuepointer < 5) {
                for (let k = 0; k < 8; k++) {
                    if (arr[queue[queuepointer][0] + dir[0][k]][queue[queuepointer][1] + dir[1][k]] === 1) {
                        if (queue[queuepointer][0] + dir[0][k] >= 0 && queue[queuepointer][0] + dir[0][k] <= n - 1 && queue[queuepointer][1] + dir[1][k] >= 0 && queue[queuepointer][1] + dir[1][k] <= m - 1) {
                            queue.push([queue[queuepointer][0] + dir[0][k], queue[queuepointer][1] + dir[1][k]]);
                            arr[queue[queuepointer][0] + dir[0][k]][queue[queuepointer][1] + dir[1][k]] = 0;
                        }
                    }
                }
                queuepointer++;
            }
        }
        if (flag)
            cnt++;
    }
}
console.log(queue);
console.log(cnt);