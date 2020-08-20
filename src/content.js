browser.runtime.onMessage.addListener((request) => {
  if (request.dir === "backgroundScript") {
    window.postMessage(request, "*");
  }
});

window.addEventListener("message", function (m) {
  if (m.target && m.target !== window) {
    return;
  }

  if (m.data && m.data.dir === "pageScript") {
    if (m.data.message) {
      browser.runtime.sendMessage(
        { message: m.data.message, dir: "contentScript" },
      );
    }
  }
});
