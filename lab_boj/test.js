let fs = require("fs");
let input = fs.readFileSync(0, "utf-8").trim();
const N = parseInt(input);

let i = 1;
while (i <= 9) {
  console.log(`${N} * ${i} = ${N * i}`);
  i++;
}
