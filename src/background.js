const integrations = ["deezer.com", "www.deezer.com", "listen.tidal.com"];

const playerState = {
  tabId: null,
};

const handleTabUpdated = (tabId, changeInfo, tabInfo) => {
  if (
    changeInfo.status === "complete" &&
    integrations.includes((new URL(tabInfo.url)).hostname)
  ) {
    playerState.tabId = tabId;
  }
};

const handleNativeMessage = (msg) => {
  switch (msg.cmd) {
    case "raise":
      browser.tabs.update(playerState.tabId, { active: true });
      break;
    case "quit":
      browser.tabs.remove(playerState.tabId);
      playerState.tabId = null;
      break;
    default:
      browser.tabs.sendMessage(
        playerState.tabId,
        { cmd: msg.cmd, dir: "backgroundScript" },
      );
  }
};

const handleContentMessage = (msg) => {
  if (msg.data && msg.data.dir === "contentScript") {
    port.sendMessage(msg);
  }
};

const createMenu = () => {
  browser.menus.create({
    id: "controllTab",
    title: "Controll this tab with MPRIS-DBus",
    contexts: ["tab"],
  });
  browser.menus.onClicked.addListener(handleMenuOnClick);
};

const handleMenuOnClick = (info, tab) => {
  switch (info.menuItemId) {
    case "controllTab":
      playerState.tabId = tab.id;
      break;
    default:
      break;
  }
};

const init = () => {
  const port = browser.runtime.connectNative("mpris_dbus_connector");
  port.onMessage.addListener(handleNativeMessage);
  browser.tabs.onUpdated.addListener(handleTabUpdated);
  createMenu();
  browser.runtime.onMessage.addListener(handleContentMessage);
};

init();
