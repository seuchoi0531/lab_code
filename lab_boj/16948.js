// https://www.acmicpc.net/problem/16948
// bfs

let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").trim().split("\n");
let n = Number(input[0]);
let [a, b, x, y] = input[1].trim().split(" ").map(Number);
let fun = [m1, m2, m3, m4, m5, m6];

let arr = new Array();
for (let i = 0; i < n; i++) arr.push(new Array(n).fill(-1));
arr[a][b] = 0;
let queue = [];
queue.push([a, b]);
let queuepointer = 0;
let flag = false;

while (queue.length > queuepointer) {
  let crt = queue[queuepointer];
  fun.forEach((f) => {
    let tmp = f(crt);
    if (tmp) {
      if (x == tmp[0] && y == tmp[1]) {
        arr[tmp[0]][tmp[1]] = arr[crt[0]][crt[1]] + 1;
        flag = true;
      } else if (arr[tmp[0]][tmp[1]] == -1) {
        arr[tmp[0]][tmp[1]] = arr[crt[0]][crt[1]] + 1;
        queue.push(tmp);
      }
    }
  });
  if (flag) break;
  queuepointer++;
}
console.log(arr[x][y]);

function m1([a, b]) {
  if (a - 2 < 0 || b - 1 < 0) return false;
  return [a - 2, b - 1];
}
function m2([a, b]) {
  if (a - 2 < 0 || b + 1 >= n) return false;
  return [a - 2, b + 1];
}
function m3([a, b]) {
  if (a + 2 >= n || b - 1 < 0) return false;
  return [a + 2, b - 1];
}
function m4([a, b]) {
  if (a + 2 >= n || b + 1 >= n) return false;
  return [a + 2, b + 1];
}
function m5([a, b]) {
  if (b - 2 < 0) return false;
  return [a, b - 2];
}
function m6([a, b]) {
  if (b + 2 >= n) return false;
  return [a, b + 2];
}
