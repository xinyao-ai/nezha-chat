/* 👺 哪吒全能娛樂基地｜Push V2 專用 Service Worker */
self.addEventListener("push", function(event) {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    try {
      data = {
        body: event.data ? event.data.text() : ""
      };
    } catch {}
  }

  const title =
    String(data.title || "👺哪吒全能娛樂基地🚩");

  const options = {
    body: String(data.body || "有新的聊天室通知"),
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: String(data.tag || "nezha-push-v2"),
    renotify: true,
    data: {
      url: String(data.url || "/")
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      title,
      options
    )
  );
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const target =
    (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil((async function() {
    const windows = await clients.matchAll({
      type: "window",
      includeUncontrolled: true
    });

    for (const client of windows) {
      try {
        if ("focus" in client) {
          await client.focus();
          if ("navigate" in client) {
            await client.navigate(target);
          }
          return;
        }
      } catch {}
    }

    if (clients.openWindow) {
      await clients.openWindow(target);
    }
  })());
});
