<<<<<<< HEAD
// // // // https://www.acmicpc.net/problem/1012

// let fs = require("fs");
// const input = fs.readFileSync(0, "utf-8").trim().split("\n");

// const T = Number(input[0]);
// let line = 1;

// const dx = [1, -1, 0, 0];
// const dy = [0, 0, 1, -1];

// for (let t = 0; t < T; t++) {
//   const [M, N, K] = input[line++].split(" ").map(Number);
//   const field = Array.from({ length: N }, () => Array(M).fill(0));

//   for (let i = 0; i < K; i++) {
//     const [x, y] = input[line++].split(" ").map(Number);
//     field[y][x] = 1;
//   }

//   let wormCount = 0;

//   const bfs = (startY, startX) => {
//     const queue = [[startY, startX]];
//     field[startY][startX] = 0;

//     while (queue.length) {
//       const [y, x] = queue.shift();

//       for (let dir = 0; dir < 4; dir++) {
//         const ny = y + dy[dir];
//         const nx = x + dx[dir];

//         if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
//         if (field[ny][nx] === 1) {
//           field[ny][nx] = 0;
//           queue.push([ny, nx]);
//         }
//       }
//     }
//   };

//   for (let y = 0; y < N; y++) {
//     for (let x = 0; x < M; x++) {
//       if (field[y][x] === 1) {
//         bfs(y, x);
//         wormCount++;
//       }
//     }
//   }

//   console.log(wormCount);
// }

let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").trim().split("\n");

const T = Number(input[0]);
let line = 1;

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

for (let t = 0; t < T; t++) {
  const [M, N, K] = input[line++].split(" ").map(Number);
  const field = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 0; i < K; i++) {
    const [x, y] = input[line++].split(" ").map(Number);
    field[y][x] = 1;
  }

  const dfs = (y, x) => {
    field[y][x] = 0;

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (field[ny][nx] === 1) {
        dfs(ny, nx);
      }
    }
  };

  let wormCount = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (field[y][x] === 1) {
        dfs(y, x);
        wormCount++;
      }
    }
  }

  console.log(wormCount);
=======
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
>>>>>>> 8a46d7198822c46d8dbb1639427b14c67a72d77b
}
console.log(queue);
console.log(cnt);