(() => {
  const ASSET_BASE = "https://nezha-chat.pages.dev";
  const THEME_KEY = "nezhaChatTheme";

  const BUILD_ID = "nezha-ui-20260902-1805";
  const SELF_URL = ASSET_BASE + "/ui.js";
  const STYLE_URL = ASSET_BASE + "/ui.css";
  const UPDATE_INTERVAL = 20000;

  function getDraftKey() {
    const room =
      new URLSearchParams(window.location.search).get("room") ||
      "main";

    return "nezhaUiDraft:" + room;
  }

  function findMessageInput() {
    return (
      document.getElementById("message") ||
      document.querySelector('.bottom input[type="text"]') ||
      document.querySelector('.composer input[type="text"]')
    );
  }

  function saveCurrentDraft() {
    const input = findMessageInput();
    const value = String(input?.value || "");

    if (!value) return;

    try {
      sessionStorage.setItem(getDraftKey(), value);
    } catch {}
  }

  function restoreCurrentDraft() {
    const input = findMessageInput();
    if (!input || input.value) return;

    let value = "";

    try {
      value = sessionStorage.getItem(getDraftKey()) || "";
    } catch {}

    if (!value) return;

    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));

    try {
      sessionStorage.removeItem(getDraftKey());
    } catch {}
  }

  /*
    同一份 ui.js 每 20 秒會用 script tag 重新抓最新版。
    script tag 不受跨網域 fetch/CORS 限制。
    如果抓到新版 BUILD_ID，就自動刷新聊天室 iframe。
  */
  const previousBuild = window.__nezhaUiBuildId || "";

  if (previousBuild === BUILD_ID) {
    return;
  }

  if (previousBuild && previousBuild !== BUILD_ID) {
    if (!window.__nezhaUiReloading) {
      window.__nezhaUiReloading = true;
      saveCurrentDraft();
      setTimeout(() => window.location.reload(), 120);
    }
    return;
  }

  window.__nezhaUiBuildId = BUILD_ID;

  const THEMES = [
    {
      id: "milk-gold",
      icon: "🤎",
      name: "奶茶金",
      desc: "溫暖舒服・現在這種質感",
      swatches: ["#f7f2e8", "#5d4732", "#c29a56"],
      previewBg: "linear-gradient(135deg, #9a7652 0%, #7a5a3d 58%, #b8915e 100%)",
      previewText: "#fff6e8",
      previewDesc: "#f4e4c8",
      previewBorder: "#caa264"
    },
    {
      id: "navy-gold",
      icon: "🌌",
      name: "海軍藍金",
      desc: "沉穩高級・體育感最強",
      swatches: ["#eef2f7", "#17263b", "#c7a15a"],
      previewBg: "linear-gradient(135deg, #16304a 0%, #24486a 55%, #c7a15a 100%)",
      previewText: "#f9f2e4",
      previewDesc: "#d8e3ef",
      previewBorder: "#c7a15a"
    },
    {
      id: "obsidian-gold",
      icon: "🖤",
      name: "曜石黑金",
      desc: "俐落霸氣・娛樂城氛圍",
      swatches: ["#0f1012", "#2e3136", "#d0aa62"],
      previewBg: "linear-gradient(135deg, #0a0b0d 0%, #1c1f24 58%, #4a3920 100%)",
      previewText: "#f5dfb4",
      previewDesc: "#d1c2a3",
      previewBorder: "#c9a45e"
    },
    {
      id: "pearl-pink",
      icon: "🌸",
      name: "珍珠粉金",
      desc: "柔和乾淨・可愛但不幼稚",
      swatches: ["#fff4f5", "#8e6670", "#c9a56a"],
      previewBg: "linear-gradient(135deg, #fff5f7 0%, #f5e2e8 60%, #ecd4dd 100%)",
      previewText: "#704e58",
      previewDesc: "#8a6a73",
      previewBorder: "#c9a56a"
    },
    {
      id: "emerald-gold",
      icon: "💚",
      name: "翡翠綠金",
      desc: "高級會所・耐看不刺眼",
      swatches: ["#f1f5ef", "#28493c", "#c5a45e"],
      previewBg: "linear-gradient(135deg, #eef5ef 0%, #dfece4 55%, #c9dccc 100%)",
      previewText: "#2d4e41",
      previewDesc: "#4f6d60",
      previewBorder: "#c5a45e"
    },
    {
      id: "amethyst-gold",
      icon: "💜",
      name: "紫晶金",
      desc: "神秘華麗・老虎機感",
      swatches: ["#f4f0f6", "#4d3d5c", "#c8a25e"],
      previewBg: "linear-gradient(135deg, #f3eef7 0%, #e7dff0 55%, #dccde9 100%)",
      previewText: "#58446b",
      previewDesc: "#78678a",
      previewBorder: "#c8a25e"
    }
  ];

  function refreshGithubUiCss() {
    const nextHref =
      STYLE_URL + "?v=" + Date.now().toString(36);

    const existing =
      [...document.querySelectorAll('link[rel="stylesheet"]')]
        .find(link =>
          String(link.href || "").includes("/ui.css")
        );

    if (existing) {
      existing.href = nextHref;
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = nextHref;
    document.head.appendChild(link);
  }

  function probeLatestGithubUiJs() {
    if (window.__nezhaUiProbeBusy) return;

    window.__nezhaUiProbeBusy = true;

    const script = document.createElement("script");
    script.src =
      SELF_URL + "?v=" + Date.now().toString(36);
    script.async = true;

    const finish = () => {
      window.__nezhaUiProbeBusy = false;
      script.remove();
    };

    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", finish, { once: true });
    document.head.appendChild(script);
  }

  function refreshBrandAssets() {
    const stamp = Date.now().toString(36);

    const joinLogo = document.querySelector(".logo img");
    if (joinLogo) {
      joinLogo.src = ASSET_BASE + "/logo.webp?v=" + stamp;
    }

    const headerLogo =
      document.querySelector(".header-brand-mark img");
    if (headerLogo) {
      headerLogo.src = ASSET_BASE + "/logo.webp?v=" + stamp;
    }

    const floating =
      document.querySelector(".hd-floating-login-button img");
    if (floating) {
      floating.src = ASSET_BASE + "/floating-ball.webp?v=" + stamp;
    }
  }

  function checkGithubUiUpdate() {
    if (document.hidden) return;

    refreshGithubUiCss();
    refreshBrandAssets();
    probeLatestGithubUiJs();
  }

  function startGithubUiAutoUpdate() {
    if (window.__nezhaUiAutoUpdateStarted) return;
    window.__nezhaUiAutoUpdateStarted = true;

    setTimeout(checkGithubUiUpdate, 2500);

    setInterval(() => {
      if (!document.hidden) {
        checkGithubUiUpdate();
      }
    }, UPDATE_INTERVAL);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        checkGithubUiUpdate();
      }
    });

    window.addEventListener("focus", checkGithubUiUpdate);
    window.addEventListener("beforeunload", saveCurrentDraft);
  }

  function safeGetTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY) || "milk-gold";
      return THEMES.some(theme => theme.id === saved) ? saved : "milk-gold";
    } catch {
      return "milk-gold";
    }
  }

  function safeSaveTheme(themeId) {
    try {
      localStorage.setItem(THEME_KEY, themeId);
    } catch {}
  }

  function ensureThemeStyles() {
    if (document.getElementById("nezhaThemeSwitcherStyles")) return;

    const style = document.createElement("style");
    style.id = "nezhaThemeSwitcherStyles";
    style.textContent = `
      body[data-nezha-theme="milk-gold"] {
        --th-shell:#ece5da; --th-page:#f7f2e8; --th-card:#fffdf8;
        --th-head1:#1d1916; --th-head2:#33281d; --th-main:#5d4732;
        --th-main2:#75583d; --th-accent:#c29a56; --th-soft:#efe5d7;
        --th-soft2:#f7f1e7; --th-text:#2a221c; --th-muted:#786e63;
        --th-action:#5d4732; --th-actionText:#f8ebc4; --th-danger:#5b5650;
      }
      body[data-nezha-theme="navy-gold"] {
        --th-shell:#dfe5ec; --th-page:#eef2f7; --th-card:#fbfcfe;
        --th-head1:#122033; --th-head2:#203751; --th-main:#294664;
        --th-main2:#365d80; --th-accent:#c7a15a; --th-soft:#e3e9ef;
        --th-soft2:#f3f6f9; --th-text:#1d2a37; --th-muted:#677585;
        --th-action:#294664; --th-actionText:#f8e9bd; --th-danger:#586574;
      }
      body[data-nezha-theme="obsidian-gold"] {
        --th-shell:#090a0c; --th-page:#101114; --th-card:#191b1f;
        --th-head1:#030405; --th-head2:#1b1d21; --th-main:#31343a;
        --th-main2:#202329; --th-accent:#d0aa62; --th-soft:#25282d;
        --th-soft2:#17191d; --th-text:#f3ead9; --th-muted:#b9af9f;
        --th-action:#7c5d2d; --th-actionText:#fff1c5; --th-danger:#4b4f55;
      }
      body[data-nezha-theme="pearl-pink"] {
        --th-shell:#eee3e5; --th-page:#fff4f5; --th-card:#fffafb;
        --th-head1:#5a4047; --th-head2:#80606a; --th-main:#8e6670;
        --th-main2:#a47a85; --th-accent:#c9a56a; --th-soft:#f3e3e6;
        --th-soft2:#fff4f5; --th-text:#49383d; --th-muted:#856f75;
        --th-action:#7c5963; --th-actionText:#fff1d0; --th-danger:#70666a;
      }
      body[data-nezha-theme="emerald-gold"] {
        --th-shell:#dde7e0; --th-page:#f1f5ef; --th-card:#fbfdf9;
        --th-head1:#183329; --th-head2:#2e5143; --th-main:#28493c;
        --th-main2:#3d6757; --th-accent:#c5a45e; --th-soft:#e2ebe4;
        --th-soft2:#f4f8f3; --th-text:#263b32; --th-muted:#687b71;
        --th-action:#28493c; --th-actionText:#f8ebc0; --th-danger:#58675f;
      }
      body[data-nezha-theme="amethyst-gold"] {
        --th-shell:#e4dde7; --th-page:#f4f0f6; --th-card:#fcf9fd;
        --th-head1:#30263a; --th-head2:#554466; --th-main:#4d3d5c;
        --th-main2:#6a547c; --th-accent:#c8a25e; --th-soft:#e9e1ec;
        --th-soft2:#f8f4fa; --th-text:#382f3f; --th-muted:#756b7c;
        --th-action:#4d3d5c; --th-actionText:#f8e9bd; --th-danger:#665f69;
      }

      body[data-nezha-theme] {
        background:var(--th-shell) !important;
        color:var(--th-text) !important;
      }
      body[data-nezha-theme] .page,
      body[data-nezha-theme] .join,
      body[data-nezha-theme] .admin-panel,
      body[data-nezha-theme] .admin-tools-panel,
      body[data-nezha-theme] #adminToolsPanel,
      body[data-nezha-theme] #adminPanel,
      body[data-nezha-theme] #adminPanelContentCard {
        background:var(--th-page) !important;
        color:var(--th-text) !important;
      }
      body[data-nezha-theme] .join form,
      body[data-nezha-theme] .card,
      body[data-nezha-theme] .panel,
      body[data-nezha-theme] .member,
      body[data-nezha-theme] .blocked-row,
      body[data-nezha-theme] [class*="admin-card"],
      body[data-nezha-theme] [class*="activity-admin-team-card"],
      body[data-nezha-theme] [class*="lottery-admin-activity-card"] {
        background:var(--th-card) !important;
        border-color:color-mix(in srgb, var(--th-accent) 55%, #cfc7bc) !important;
        color:var(--th-text) !important;
      }
      body[data-nezha-theme] .header {
        background:linear-gradient(135deg,var(--th-head1),var(--th-head2)) !important;
        border-bottom-color:var(--th-accent) !important;
      }
      body[data-nezha-theme] .header .title,
      body[data-nezha-theme] #roomTitleText {
        color:#f4dfae !important;
      }
      body[data-nezha-theme] .nezha-category-strip {
        background:var(--th-soft) !important;
        border-bottom-color:color-mix(in srgb, var(--th-accent) 60%, #d8d0c5) !important;
      }
      body[data-nezha-theme] .nezha-category-item {
        background:linear-gradient(180deg,var(--th-card),var(--th-soft2)) !important;
        color:var(--th-text) !important;
        border-color:var(--th-accent) !important;
      }
      body[data-nezha-theme] .chat,
      body[data-nezha-theme] .messages,
      body[data-nezha-theme] .messages-wrap,
      body[data-nezha-theme] .message-list,
      body[data-nezha-theme] #messages {
        background:var(--th-page) !important;
      }
      body[data-nezha-theme] .composer,
      body[data-nezha-theme] .input-bar,
      body[data-nezha-theme] .chat-input-wrap,
      body[data-nezha-theme] .bottom {
        background:var(--th-card) !important;
        border-top-color:color-mix(in srgb, var(--th-accent) 45%, #d8d0c5) !important;
      }
      body[data-nezha-theme] input,
      body[data-nezha-theme] textarea,
      body[data-nezha-theme] select {
        background:var(--th-card) !important;
        color:var(--th-text) !important;
        -webkit-text-fill-color:var(--th-text) !important;
        border-color:color-mix(in srgb, var(--th-accent) 50%, #c8c0b5) !important;
        caret-color:var(--th-main) !important;
      }
      body[data-nezha-theme] button,
      body[data-nezha-theme] .btn,
      body[data-nezha-theme] input[type="button"],
      body[data-nezha-theme] input[type="submit"],
      body[data-nezha-theme] .header-icon-btn,
      body[data-nezha-theme] .image-btn,
      body[data-nezha-theme] .admin-nav-btn,
      body[data-nezha-theme] [class*="admin-"][class*="btn"] {
        background:linear-gradient(180deg,var(--th-soft2),var(--th-soft)) !important;
        color:var(--th-text) !important;
        border-color:var(--th-accent) !important;
      }
      body[data-nezha-theme] #joinButton,
      body[data-nezha-theme] .join button[type="submit"],
      body[data-nezha-theme] .admin-join-submit,
      body[data-nezha-theme] .send-btn,
      body[data-nezha-theme] .header-text-btn,
      body[data-nezha-theme] .header .change-nickname-btn,
      body[data-nezha-theme] .header .admin-button,
      body[data-nezha-theme] button.active,
      body[data-nezha-theme] .admin-nav-btn.active {
        background:linear-gradient(180deg,var(--th-main2),var(--th-main)) !important;
        color:var(--th-actionText) !important;
        border-color:var(--th-accent) !important;
      }
      body[data-nezha-theme] .mute-btn,
      body[data-nezha-theme] .unmute-btn,
      body[data-nezha-theme] .kick-btn,
      body[data-nezha-theme] .block-btn,
      body[data-nezha-theme] .unblock-btn,
      body[data-nezha-theme] [class*="delete-btn"],
      body[data-nezha-theme] [class*="disable-btn"],
      body[data-nezha-theme] #memberList .member-actions button,
      body[data-nezha-theme] #blockedList button {
        background:var(--th-danger) !important;
        color:#fffaf2 !important;
        border-color:color-mix(in srgb, var(--th-danger) 75%, #333) !important;
      }

      #teamActivityButton.nezha-theme-button {
        width:78px !important;
        min-width:78px !important;
        max-width:78px !important;
        white-space:nowrap !important;
      }

      .nezha-theme-backdrop {
        position:fixed;
        inset:0;
        z-index:2147483600;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:18px;
        background:rgba(20,18,16,.42);
        backdrop-filter:blur(5px);
        -webkit-backdrop-filter:blur(5px);
      }
      .nezha-theme-panel {
        width:min(520px,100%);
        max-height:min(78vh,720px);
        overflow:auto;
        border:1px solid var(--th-accent);
        border-radius:20px;
        background:var(--th-card);
        color:var(--th-text);
        box-shadow:0 20px 55px rgba(0,0,0,.24);
      }
      .nezha-theme-head {
        position:sticky;
        top:0;
        z-index:2;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        padding:16px 18px;
        background:var(--th-card);
        border-bottom:1px solid color-mix(in srgb, var(--th-accent) 45%, transparent);
      }
      .nezha-theme-title {
        font-size:18px;
        font-weight:900;
      }
      .nezha-theme-close {
        width:38px !important;
        min-width:38px !important;
        height:38px !important;
        padding:0 !important;
        border-radius:10px !important;
        background:var(--th-soft) !important;
        color:var(--th-text) !important;
        border:1px solid var(--th-accent) !important;
      }
      .nezha-theme-grid {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:10px;
        padding:14px;
      }
      .nezha-theme-choice {
        min-height:112px !important;
        display:flex !important;
        flex-direction:column !important;
        align-items:flex-start !important;
        justify-content:space-between !important;
        gap:10px !important;
        padding:13px !important;
        border-radius:15px !important;
        background:var(--th-soft2) !important;
        color:var(--th-text) !important;
        border:1px solid color-mix(in srgb, var(--th-accent) 62%, #d7cfc3) !important;
        box-shadow:none !important;
        text-align:left !important;
      }
      .nezha-theme-choice.selected {
        outline:3px solid color-mix(in srgb, var(--th-accent) 30%, transparent);
        border-color:var(--th-accent) !important;
      }
      .nezha-theme-choice-name {
        font-size:15px;
        font-weight:900;
      }
      .nezha-theme-choice-desc {
        font-size:12px;
        color:var(--th-muted);
        line-height:1.4;
      }
      .nezha-theme-swatches {
        display:flex;
        gap:5px;
      }
      .nezha-theme-swatch {
        width:22px;
        height:22px;
        border-radius:999px;
        border:1px solid rgba(0,0,0,.12);
      }
      .nezha-theme-foot {
        padding:0 14px 15px;
        color:var(--th-muted);
        font-size:12px;
        text-align:center;
      }
      @media (max-width:520px) {
        .nezha-theme-backdrop { padding:10px; }
        .nezha-theme-grid { grid-template-columns:1fr; }
        .nezha-theme-choice { min-height:94px !important; }
        #teamActivityButton.nezha-theme-button {
          width:72px !important;
          min-width:72px !important;
          max-width:72px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyTheme(themeId, save = true) {
    const validTheme = THEMES.some(theme => theme.id === themeId)
      ? themeId
      : "milk-gold";

    document.body.setAttribute("data-nezha-theme", validTheme);
    if (save) safeSaveTheme(validTheme);

    document.querySelectorAll(".nezha-theme-choice").forEach(button => {
      const selected = button.dataset.theme === validTheme;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function closeThemePanel() {
    document.getElementById("nezhaThemeBackdrop")?.remove();
  }

  function openThemePanel() {
    closeThemePanel();

    const backdrop = document.createElement("div");
    backdrop.id = "nezhaThemeBackdrop";
    backdrop.className = "nezha-theme-backdrop";

    const panel = document.createElement("section");
    panel.className = "nezha-theme-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "更換聊天室主題");

    const head = document.createElement("div");
    head.className = "nezha-theme-head";

    const title = document.createElement("div");
    title.className = "nezha-theme-title";
    title.textContent = "🎨 更換主題";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "nezha-theme-close";
    close.textContent = "✕";
    close.setAttribute("aria-label", "關閉主題選單");
    close.addEventListener("click", closeThemePanel);

    head.append(title, close);

    const grid = document.createElement("div");
    grid.className = "nezha-theme-grid";

    const current = document.body.getAttribute("data-nezha-theme") || safeGetTheme();

    THEMES.forEach(theme => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nezha-theme-choice";
      button.dataset.theme = theme.id;
      button.setAttribute("aria-pressed", theme.id === current ? "true" : "false");
      if (theme.id === current) button.classList.add("selected");

      if (theme.previewBg) button.style.background = theme.previewBg;
      if (theme.previewText) button.style.color = theme.previewText;
      if (theme.previewBorder) button.style.borderColor = theme.previewBorder;

      const name = document.createElement("div");
      name.className = "nezha-theme-choice-name";
      name.textContent = `${theme.icon} ${theme.name}`;
      if (theme.previewText) name.style.color = theme.previewText;

      const desc = document.createElement("div");
      desc.className = "nezha-theme-choice-desc";
      desc.textContent = theme.desc;
      if (theme.previewDesc) desc.style.color = theme.previewDesc;

      const swatches = document.createElement("div");
      swatches.className = "nezha-theme-swatches";
      theme.swatches.forEach(color => {
        const swatch = document.createElement("span");
        swatch.className = "nezha-theme-swatch";
        swatch.style.background = color;
        swatches.appendChild(swatch);
      });

      button.append(name, desc, swatches);
      button.addEventListener("click", () => applyTheme(theme.id, true));
      grid.appendChild(button);
    });

    const foot = document.createElement("div");
    foot.className = "nezha-theme-foot";
    foot.textContent = "選完會自動記住，下次進聊天室會沿用。";

    panel.append(head, grid, foot);
    backdrop.appendChild(panel);

    backdrop.addEventListener("click", event => {
      if (event.target === backdrop) closeThemePanel();
    });

    document.body.appendChild(backdrop);
  }

  function convertTeamButtonToTheme() {
    const button = document.getElementById("teamActivityButton");
    if (!button) return;

    button.removeAttribute("onclick");
    button.classList.add("nezha-theme-button");
    button.textContent = "🎨 主題";
    button.title = "更換聊天室主題";
    button.setAttribute("aria-label", "更換聊天室主題");

    if (button.dataset.themeBound === "1") return;
    button.dataset.themeBound = "1";
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      openThemePanel();
    });
  }

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

    convertTeamButtonToTheme();
  }

  function init() {
    ensureThemeStyles();
    applyTheme(safeGetTheme(), false);
    applyNezhaUi();

    // 部分功能會動態重繪 Header，所以自動補綁，不用刷新。
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      applyNezhaUi();
      if (tries >= 10) clearInterval(timer);
    }, 700);
    startGithubUiAutoUpdate();
    setTimeout(restoreCurrentDraft, 500);
    setTimeout(restoreCurrentDraft, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
