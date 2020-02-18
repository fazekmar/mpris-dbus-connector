browser.runtime.onMessage.addListener((request) => {
    window.postMessage(request.cmd, "*");
});

// TODO: Get property change from page-script and send to the background.js
