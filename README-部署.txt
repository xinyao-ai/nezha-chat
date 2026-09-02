👺 哪吒全能娛樂基地｜整理後架構

【GitHub / Cloudflare Pages：管畫面】
- index.html：外層入口、PWA、通知橋接
- ui.css：顏色、排版、按鈕、登入頁、聊天室外觀
- ui.js：LOGO、浮動球、四大分類等 UI
- logo.webp：主 LOGO
- floating-ball.webp：右側浮動球
- manifest.webmanifest / sw.js：加到手機桌面
- _headers：讓 ui.css / ui.js 更新後不容易卡舊快取

【Cloudflare Worker：管後端】
- 登入驗證
- Turnstile
- WebSocket 即時聊天
- Durable Object / CHAT_ROOMS
- 公告、記事本、活動、抽獎等資料
- 管理員驗證

以後：
改顏色 / LOGO / 浮動球 / 版面 → GitHub
改聊天邏輯 / 管理員 / 資料儲存 / 活動功能 → Cloudflare Worker
