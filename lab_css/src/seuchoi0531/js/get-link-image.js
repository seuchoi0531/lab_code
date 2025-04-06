// // document.addEventListener("DOMContentLoaded", load);
// function load() {
//   const puppeteer = require("puppeteer");

//   const url = "https://jr.naver.com/character";

//   async function fetchLinks() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // 페이지로 이동
//     await page.goto(url, { waitUntil: "domcontentloaded" });

//     // 페이지의 HTML을 가져오기
//     const html = await page.content();

//     // cheerio로 HTML 파싱
//     const b = require("cheerio");
//     const $ = b.load(html);

//     let hrefValue = [];

//     $("a").each((index, element) => {
//       const href = $(element).attr("href");
//       if (href) {
//         hrefValue.push(href);
//       }
//     });

//     console.log(hrefValue);

//     await browser.close();
//   }

//   fetchLinks().catch(console.error);
// }

// load();
const puppeteer = require("puppeteer"); // 제어
const cheerio = require("cheerio"); // 파싱
const devices = require("puppeteer").devices;

const url = "https://jr.naver.com/character";

async function fetchLinks() {
  // 브라우저 실행
  const browser = await puppeteer.launch({ headless: true }); // headless: true로 백그라운드에서 실행
  const page = await browser.newPage();

  console.log(devices);
  // iPhone 6 환경으로 설정
  //   const iPhone = puppeteer.devices["iPhone 6"];
  //   //   const iPhone = puppeteer.devices["iPhone 6"]; // iPhone 6 설정 (다른 기기도 가능)
  //   await page.emulate(iPhone); // 모바일 기기 환경으로 설정

  // 페이지로 이동
  await page.goto(url, { waitUntil: "domcontentloaded" }); // 페이지가 DOM 로딩 완료될 때까지 대기

  // 페이지의 HTML을 가져오기
  const html = await page.content();
  console.log(html); //html보여줌!
  // cheerio로 HTML 파싱
  const $ = cheerio.load(html);

  let hrefValue = [];

  // a 태그에서 href 속성 값 추출
  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (href) {
      hrefValue.push(href); // href가 있으면 배열에 추가
    }
  });

  // hrefValue 배열 출력
  console.log(hrefValue);

  await browser.close(); // 브라우저 종료
}

fetchLinks().catch(console.error);
