import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
const linkarr = ["https://velog.io/@huniversal/JavaScript-재귀함수", "https://www.instagram.com/mongxuni/", "https://www.instagram.com/huniivers/"];
// linkarr.forEach((e) => {
//   getLinkPreview(e).then((data) => console.log(data));
//   console.log("------------");
// });
// const data = getLinkPreview(linkarr[0]).json();
// console.log(data);
getLinkPreview("https://velog.io/@huniversal/JavaScript-Prototype-1").then((data) => console.log(data));
