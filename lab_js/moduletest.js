// container 하위의 button 요소 찾기
const btn = document.querySelector("#container > button");
const countSpan = document.querySelector("#container > span");

btn.addEventListener("click", function () {
  const count = parseInt(countSpan.firstChild.nodeValue);
  countSpan.firstChild.nodeValue = count + 1;
});
