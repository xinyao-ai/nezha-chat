(() => {
  const ASSET_BASE = "https://nezha-chat.pages.dev";
  const KEY = "nezhaThemeV2";

  const themes = {
    latte: {
      name: "奶茶金", icon: "🤎",
      bg: "#ece5da", page: "#f7f2e8", card: "#fffdf8", chat: "#faf7f1",
      head1: "#1d1916", head2: "#33281d", cat: "#efe7db",
      btn: "#f1e6d6", btnText: "#493726", primary1: "#75583d", primary2: "#5d4732",
      primaryText: "#f8ebc4", text: "#2a221c", muted: "#786e63", gold: "#c29a56"
    },
    navy: {
      name: "海軍藍金", icon: "🌌",
      bg: "#e5ebf0", page: "#f1f5f8", card: "#fbfdff", chat: "#f5f8fa",
      head1: "#14283f", head2: "#1d3a5a", cat: "#e5edf4",
      btn: "#e8eef4", btnText: "#20364d", primary1: "#315678", primary2: "#1d3d5c",
      primaryText: "#f5dfae", text: "#263442", muted: "#6e7b87", gold: "#c5a05b"
    },
    obsidian: {
      name: "曜石黑金", icon: "🖤",
      bg: "#dcd8d1", page: "#eeeae3", card: "#faf7f1", chat: "#f1eee8",
      head1: "#111111", head2: "#29251f", cat: "#dfdad1",
      btn: "#e8e2d8", btnText: "#2d2822", primary1: "#443b31", primary2: "#211e1a",
      primaryText: "#efd69d", text: "#28241f", muted: "#756f67", gold: "#c29c56"
    },
    pearl: {
      name: "珍珠粉金", icon: "🌸",
      bg: "#f0e7e9", page: "#fbf3f4", card: "#fffafa", chat: "#fcf7f8",
      head1: "#5d4149", head2: "#81606a", cat: "#f5e9eb",
      btn: "#f2e5e8", btnText: "#684853", primary1: "#886672", primary2: "#6e4f59",
      primaryText: "#fff0c8", text: "#3d3034", muted: "#806f74", gold: "#c7a36a"
    },
    emerald: {
      name: "翡翠綠金", icon: "💚",
      bg: "#e3ebe6", page: "#eff5f1", card: "#fbfdfb", chat: "#f4f8f5",
      head1: "#19372f", head2: "#295348", cat: "#e6efe9",
      btn: "#e5efe8", btnText: "#2d5247", primary1: "#386858", primary2: "#244b40",
      primaryText: "#f5e2ad", text: "#273832", muted: "#6e7d76", gold: "#c5a05a"
    },
    amethyst: {
      name: "紫晶金", icon: "💜",
      bg: "#eae5ef", page: "#f3eff7", card: "#fcf9fd", chat: "#f7f4fa",
      head1: "#392a48", head2: "#553d69", cat: "#eee8f2",
      btn: "#ebe3ef", btnText: "#503d5e", primary1: "#684e7b", primary2: "#4c375d",
      primaryText: "#f5dfaa", text: "#382e40", muted: "#786e7e", gold: "#c4a063"
    }
  };

  const css = `
    html[data-nezha-theme] body{background:var(--t-bg)!important;color:var(--t-text)!important}
    html[data-nezha-theme] .page,
    html[data-nezha-theme] .join{background:var(--t-page)!important;color:var(--t-text)!important}

    html[data-nezha-theme] .join form,
    html[data-nezha-theme] .card,
    html[data-nezha-theme] .member,
    html[data-nezha-theme] .blocked-row{
      background:var(--t-card)!important;
      color:var(--t-text)!important
    }

    html[data-nezha-theme] .header{
      background:linear-gradient(135deg,var(--t-head1),var(--t-head2))!important;
      border-bottom-color:var(--t-gold)!important
    }

    html[data-nezha-theme] .header .title,
    html[data-nezha-theme] #roomTitleText{
      color:#f4dfae!important
    }

    html[data-nezha-theme] .nezha-category-strip{
      background:var(--t-cat)!important
    }

    html[data-nezha-theme] .nezha-category-item{
      background:var(--t-card)!important;
      color:var(--t-btn-text)!important;
      border-color:var(--t-gold)!important
    }

    html[data-nezha-theme] .chat,
    html[data-nezha-theme] .messages,
    html[data-nezha-theme] .messages-wrap,
    html[data-nezha-theme] #messages{
      background:var(--t-chat)!important;
      color:var(--t-text)!important
    }

    html[data-nezha-theme] .composer,
    html[data-nezha-theme] .bottom{
      background:var(--t-card)!important
    }

    html[data-nezha-theme] button,
    html[data-nezha-theme] .btn,
    html[data-nezha-theme] .header-icon-btn{
      background:var(--t-btn)!important;
      color:var(--t-btn-text)!important;
      border-color:var(--t-gold)!important
    }

    html[data-nezha-theme] #joinButton,
    html[data-nezha-theme] .send-btn,
    html[data-nezha-theme] .header-text-btn,
    html[data-nezha-theme] .header .admin-button,
    html[data-nezha-theme] button.active{
      background:linear-gradient(180deg,var(--t-primary1),var(--t-primary2))!important;
      color:var(--t-primary-text)!important;
      border-color:var(--t-gold)!important
    }

    html[data-nezha-theme] input,
    html[data-nezha-theme] textarea,
    html[data-nezha-theme] select{
      background:var(--t-card)!important;
      color:var(--t-text)!important;
      -webkit-text-fill-color:var(--t-text)!important
    }

    #teamActivityButton{
      display:inline-flex!important;
      width:78px!important;
      min-width:78px!important;
      max-width:78px!important
    }

    .nz-theme-overlay{
      position:fixed;
      inset:0;
      z-index:999999;
      display:none;
      align-items:center;
      justify-content:center;
      padding:18px;
      background:rgba(24,20,17,.46);
      backdrop-filter:blur(5px)
    }

    .nz-theme-overlay.show{display:flex}

    .nz-theme-panel{
      width:min(430px,100%);
      background:#fffdf8;
      border:1px solid #c7a66b;
      border-radius:18px;
      padding:17px;
      box-shadow:0 22px 55px rgba(30,24,19,.25)
    }

    .nz-theme-head{
      display:flex;
      align-items:center;
      justify-content:space-between
    }

    .nz-theme-title{
      font-size:18px;
      font-weight:900
    }

    .nz-theme-close{
      width:38px!important;
      height:38px!important;
      min-width:38px!important
    }

    .nz-theme-sub{
      margin:0 0 13px;
      color:#7b7066;
      font-size:12px
    }

    .nz-theme-grid{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:9px
    }

    .nz-theme-option{
      min-height:82px!important;
      padding:11px!important;
      border-radius:13px!important;
      background:#fff!important;
      color:#352c25!important;
      border:1px solid #ddd0bd!important;
      box-shadow:none!important;
      text-align:left!important
    }

    .nz-theme-option.active{
      border:2px solid #a8864f!important;
      background:#fff9ed!important
    }

    .nz-theme-name{
      font-size:14px;
      font-weight:900
    }

    .nz-swatches{
      display:flex;
      gap:5px;
      margin-top:9px
    }

    .nz-swatch{
      width:28px;
      height:9px;
      border-radius:999px;
      border:1px solid rgba(0,0,0,.08)
    }
  `;

  function injectStyle() {
    if (document.getElementById("nzThemeStyle")) return;

    const style = document.createElement("style");
    style.id = "nzThemeStyle";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getSaved() {
    try {
      const value = localStorage.getItem(KEY);
      return themes[value] ? value : "latte";
    } catch {
      return "latte";
    }
  }

  function applyTheme(id) {
    const theme = themes[id] || themes.latte;
    const root = document.documentElement;

    root.setAttribute(
      "data-nezha-theme",
      themes[id] ? id : "latte"
    );

    const vars = {
      bg: theme.bg,
      page: theme.page,
      card: theme.card,
      chat: theme.chat,
      head1: theme.head1,
      head2: theme.head2,
      cat: theme.cat,
      btn: theme.btn,
      "btn-text": theme.btnText,
      primary1: theme.primary1,
      primary2: theme.primary2,
      "primary-text": theme.primaryText,
      text: theme.text,
      muted: theme.muted,
      gold: theme.gold
    };

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(`--t-${key}`, value);
    });

    try {
      localStorage.setItem(KEY, id);
    } catch {}

    document
      .querySelectorAll(".nz-theme-option")
      .forEach(button => {
        button.classList.toggle(
          "active",
          button.dataset.theme === id
        );
      });
  }

  function closePicker() {
    document
      .getElementById("nzThemeOverlay")
      ?.classList.remove("show");
  }

  function openPicker() {
    buildPicker();

    document
      .getElementById("nzThemeOverlay")
      ?.classList.add("show");
  }

  function buildPicker() {
    if (document.getElementById("nzThemeOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "nzThemeOverlay";
    overlay.className = "nz-theme-overlay";

    const panel = document.createElement("div");
    panel.className = "nz-theme-panel";

    panel.innerHTML = `
      <div class="nz-theme-head">
        <div class="nz-theme-title">🎨 更換主題</div>
        <button class="nz-theme-close" type="button">×</button>
      </div>

      <p class="nz-theme-sub">
        選一個喜歡的風格，下次進來也會保留。
      </p>

      <div class="nz-theme-grid"></div>
    `;

    const grid = panel.querySelector(".nz-theme-grid");

    Object.entries(themes).forEach(([id, theme]) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "nz-theme-option";
      button.dataset.theme = id;

      button.innerHTML = `
        <div class="nz-theme-name">
          ${theme.icon} ${theme.name}
        </div>

        <div class="nz-swatches">
          ${[theme.page, theme.primary1, theme.gold]
            .map(
              color =>
                `<span
                  class="nz-swatch"
                  style="background:${color}"
                ></span>`
            )
            .join("")}
        </div>
      `;

      button.addEventListener("click", () => {
        applyTheme(id);
        setTimeout(closePicker, 100);
      });

      grid.appendChild(button);
    });

    panel
      .querySelector(".nz-theme-close")
      .addEventListener("click", closePicker);

    overlay.appendChild(panel);

    overlay.addEventListener("click", event => {
      if (event.target === overlay) {
        closePicker();
      }
    });

    document.body.appendChild(overlay);

    applyTheme(getSaved());
  }

  function makeThemeButton() {
    const button =
      document.getElementById("teamActivityButton");

    if (!button) return;

    button.removeAttribute("onclick");
    button.onclick = null;

    button.textContent = "🎨 主題";
    button.title = "更換聊天室主題";
    button.setAttribute(
      "aria-label",
      "更換聊天室主題"
    );

    button.style.display = "inline-flex";

    if (button.dataset.themeBound !== "1") {
      button.dataset.themeBound = "1";

      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        openPicker();
      });
    }
  }

  function brand() {
    document.title =
      "👺哪吒全能娛樂基地🚩";

    const joinLogo =
      document.querySelector(".logo img");

    if (joinLogo) {
      joinLogo.src =
        ASSET_BASE + "/logo.webp";
    }

    const headerLogo =
      document.querySelector(
        ".header-brand-mark img"
      );

    if (headerLogo) {
      headerLogo.src =
        ASSET_BASE + "/logo.webp";
    }

    const floating =
      document.querySelector(
        ".hd-floating-login-button img"
      );

    if (floating) {
      floating.src =
        ASSET_BASE + "/floating-ball.webp";
    }

    const title =
      document.getElementById(
        "roomTitleText"
      );

    if (
      title &&
      (
        !title.textContent ||
        /皇鼎|HD888/.test(title.textContent)
      )
    ) {
      title.textContent =
        "👺哪吒全能娛樂基地🚩";
    }

    makeThemeButton();
  }

  function init() {
    injectStyle();
    applyTheme(getSaved());
    brand();
    buildPicker();

    setTimeout(brand, 700);
    setTimeout(brand, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
