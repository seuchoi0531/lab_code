// const puppeteer = require("puppeteer");

// (async () => {
//   // 브라우저를 실행합니다.
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // 디바이스 설정
//   const iPhone = puppeteer.devices["iPhone 6"];

//   // iPhone 6 디바이스 환경으로 페이지를 설정합니다.
//   await page.emulate(iPhone);

//   // URL을 열고 작업을 진행합니다.
//   await page.goto("https://example.com");

//   // 스크린샷을 찍어 저장합니다.
//   await page.screenshot({ path: "screenshot.png" });

//   // 브라우저를 종료합니다.
//   await browser.close();
// })();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // puppeteer.devices 객체의 모든 디바이스 목록을 출력합니다.
  console.log(puppeteer.devices);

  await browser.close();
})();
