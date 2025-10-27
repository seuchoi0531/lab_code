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
}
