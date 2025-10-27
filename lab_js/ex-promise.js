const rangediv = document.querySelector("#range-div");
const range = document.querySelector("#range");

//rangediv.textContent = range.value;
updateRangeDiv();

// range.addEventListener("input", () => {
//   rangediv.textContent = range.value;
// });
range.addEventListener("input", updateRangeDiv);

// function updateRangeDiv() {
//   const num = range.value;
//   if (num == Math.trunc(num)) {
//     rangediv.textContent = num + ".0";
//   } else {
//     rangediv.textContent = num;
//   }
// }
// function updateRangeDiv() {
//   const num = range.value;
//   let result = num;
//   if (num == Math.trunc(num)) result += ".0";
//   rangediv.textContent = result;
// }
// 내코드
// 나 못짜름ㅎㅎ
function updateRangeDiv() {
  let result = range.value;
  rangediv.textContent = range.value == Math.trunc(range.value) ? result + ".0" : result;
}

const opr = document.querySelector("#opacity-range");
const opd = document.querySelector("#opacity-div");

setOp();
function setOp() {
  opd.style.opacity = opr.value;
  opr.addEventListener("input", () => {
    opd.style.opacity = opr.value;
    md.style.opacity = opr.value;
  });
}
const mr = document.querySelector("#move-range");
const md = document.querySelector("#move-div");
md.style.translate = `${mr.value}px 0`;
mr.addEventListener("input", () => {
  md.style.translate = `${mr.value}px 0`;
  opd.style.translate = `0 ${mr.value}px`;
});
