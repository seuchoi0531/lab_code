function max(n1, n2) {
  console.log(result);
  let result;
  if (n1 > n2) {
    result = n1;
  } else {
    result = n2;
  }

  return result;
}

console.log(max(10, 20)); // 20
console.log(max(200, 30)); // 200
let arr = [1, 2, 3, 4, 5];
let liList = document.getElementsByTagName("li");

Array.from(liList).forEach((e, i) => {
  if (i % 2 == 0) {
    e.style.backgroundColor = "#000";
  } else {
    e.style.backgroundColor = "#fff";
  }
});

arr.forEach((e, i) => {});
let hello = (a, b) => {
  console.log("HI!");
};

var f = function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
};

console.log(f(5));
// console.log(5 * f(4));
// console.log(5 * 4 * f(3));
// console.log(5 * 4 * 3 * f(2));
// console.log(5 * 4 * 3 * 2 * f(1));
// console.log(5 * 4 * 3 * 2 * 1);

/*
  5!
  = 5 * 4 * 3 * 2 * 1
  = 5 * 4!
  = 5 * 4 * 3!
  = 5 * 4 * 3 * 2!
  = 5 * 4 * 3 * 2 * 1!
  
  n!
  = n * (n-1)!
*/
// 피보나치
