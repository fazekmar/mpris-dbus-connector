browser.runtime.onMessage.addListener((request) => {
  if (request.dir === "backgroundScript") {
    window.postMessage(request, "*");
  }
});

// TODO: Get property change from page-script and send to the background.js
