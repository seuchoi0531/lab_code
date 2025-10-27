$(document).ready(function () {
  convertCss();

  const bodyId = $("body").attr("id");

  if (bodyId === "tt-body-page") $("#global_header").hide();

  $("section.article_protected input").attr(
    "onkeydown",
    "if (event.keyCode == 13)[##_article_dissolve_##]"
  );
  $("section.article_protected button").attr(
    "onclick",
    "[##_article_dissolve_##]"
  );

  $("section.list_container .list_rep:first").css({
    "border-top": "none",
  });

  $("#tag_label .tag_label_rep_container")
    .contents()
    .each(function () {
      if (this.nodeType === 3) {
        $(this).remove();
      }
    });

  $("#menuBtn, #blur_container").on("click", function () {
    $("#sidebar").toggleClass("active");
    $("#blur_container").toggleClass("active");
  });

  hljs.highlightAll();

  if ($("#article_rep_desc").find("h1, h2").length > 0) convertToc();

  if ($("#article_rep_desc").find("pre").length > 0) convertCodeBlock();

  $("#article_rep_desc")
    .find("*")
    .contents()
    .filter(function () {
      return this.nodeType === 3 && this.nodeValue.includes("`");
    })
    .each(function () {
      const text = $(this).text();
      const replaced = text.replace(/`([^`]+)`/g, "<mark>$1</mark>");
      if (replaced !== text) {
        $(this).replaceWith(replaced);
      }
    });

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height();
    const winHeight = $(window).height();

    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    if (scrollTop >= 40) $("#top_header").addClass("active");
    else $("#top_header").removeClass("active");

    $("#top_header .indicator").css({
      width: `${Math.round(scrollPercent * 100) / 100}%`,
    });
  });
});

function convertCss() {
  const baseFontSize = 16;

  const rootStyles = getComputedStyle(document.documentElement);
  const wValue = rootStyles.getPropertyValue("--w").trim();

  const px = parseFloat(wValue);
  const remValue = px / baseFontSize;

  document.documentElement.style.setProperty("--a-w", `${remValue}rem`);
}

function convertToc() {
  const m_toc = $("<ul></ul>");
  const f_toc = $("<ul></ul>");

  $("#article_rep_desc h1, #article_rep_desc h2").each(function (index) {
    const $heading = $(this);
    const text = $heading.text().trim();

    $heading.html(text);

    const id = "heading-" + index;
    $heading.attr("id", id);

    m_toc.append(
      $("<li></li>").append(
        $("<a></a>")
          .attr("href", "#" + id)
          .text(`${text}`)
      )
    );
    f_toc.append(
      $("<li></li>").append(
        $("<a></a>")
          .attr("href", "#" + id)
          .text(`${text}`)
      )
    );
  });

  const mainToc = $(`<div class="toc_container" id="main-toc">
    <div class="title">목차</div>
    </div>`);

  mainToc.append(m_toc);

  const floatingToc = $(`
    <div class="toc_container" id="floating-toc">
    <div class="title">목차</div>
    </div>`);

  floatingToc.append(f_toc);

  $("div#article_rep_desc").prepend(
    $(`<aside class="right_bar"></aside>`).append(floatingToc)
  );

  $("div#article_rep_desc").prepend(mainToc);

  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));

    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 60,
        },
        500
      );
    }
  });

  if ($("#main-toc").length) {
    const mainTocTop =
      $("#main-toc").offset().top + $("#main-toc").outerHeight();

    $(window).on("scroll", function () {
      const scrollTop = $(window).scrollTop();

      if (scrollTop >= mainTocTop) $("#floating-toc").css({ opacity: 1 });
      else $("#floating-toc").css({ opacity: 0 });
    });
  }
}

function convertCodeBlock() {
  $("pre > code").each(function () {
    const $codeBlock = $(this);
    $codeBlock.css("padding", "0");

    const codes = $codeBlock.html().split("\n");

    const processedCodes = codes
      .map((line) => `<div class="line">${line}</div>`)
      .join("");

    const copyButton = `<button type="button" class="copy-btn" aria-label="copy" data-code="${encodeURI(
      $codeBlock.text()
    )}" ><i class="fa-solid fa-copy"></i></button>`;

    const codeBody = `<div class="code-body">${processedCodes}</div>`;

    const codeHeader = `
      <div class="code-header">
        <div class="left">
          <span class="red btn"></span>
          <span class="yellow btn"></span>
          <span class="green btn"></span>
        </div>
         ${copyButton}
      </div>`;

    $codeBlock.html(codeHeader + codeBody);
  });

  $(document).on("click", ".copy-btn", function () {
    const code = decodeURIComponent($(this).data("code"));
    navigator.clipboard
      .writeText(code)
      .then(() => {
        const $btn = $(this);
        const originalIcon = $btn.html();

        $btn.html('<i class="fa-solid fa-check"></i>');
        setTimeout(() => {
          $btn.html(originalIcon);
        }, 1500);
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  });
}
