
(() => {
  const ASSET_BASE = "https://nezha-chat.pages.dev";

  function applyNezhaUi() {
    document.title = "👺哪吒全能娛樂基地🚩";

    const joinLogo = document.querySelector(".logo img");
    if (joinLogo) joinLogo.src = ASSET_BASE + "/logo.webp";

    const headerLogo = document.querySelector(".header-brand-mark img");
    if (headerLogo) headerLogo.src = ASSET_BASE + "/logo.webp";

    const floating = document.querySelector(".hd-floating-login-button img");
    if (floating) floating.src = ASSET_BASE + "/floating-ball.webp";

    const roomTitle = document.getElementById("roomTitleText");
    if (roomTitle && (!roomTitle.textContent || /皇鼎|HD888/.test(roomTitle.textContent))) {
      roomTitle.textContent = "👺哪吒全能娛樂基地🚩";
    }

    const adminHeading = [...document.querySelectorAll("h1,h2,h3,strong,div,span")]
      .find(el => el.childElementCount === 0 && el.textContent.trim() === "HD888 ADMIN");
    if (adminHeading) adminHeading.textContent = "NEZHA ADMIN";

    const header = document.querySelector(".header");
    if (header && !document.querySelector(".nezha-category-strip")) {
      const strip = document.createElement("div");
      strip.className = "nezha-category-strip";
      strip.setAttribute("aria-label", "娛樂分類");
      strip.innerHTML = `
        <div class="nezha-category-item">⚽ <span>體育</span></div>
        <div class="nezha-category-item">🎰 <span>老虎機</span></div>
        <div class="nezha-category-item">🎟️ <span>彩票</span></div>
        <div class="nezha-category-item">🏎️ <span>跑車</span></div>
      `;
      header.insertAdjacentElement("afterend", strip);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyNezhaUi, { once: true });
  } else {
    applyNezhaUi();
  }

  // 某些聊天室區塊會動態重繪，低成本補一次。
  setTimeout(applyNezhaUi, 800);
})();
