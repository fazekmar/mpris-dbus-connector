const integrations = [ 'deezer.com', 'www.deezer.com' ];
let playerTabId = null;

const handleTabUpdated = (tabId, changeInfo, tabInfo) => {
    if (changeInfo.status === 'complete' && integrations.includes((new URL(tabInfo.url)).hostname)) {
        playerTabId = tabId;
    }
};

// TODO: Handle content script mgs and send to the Native application

const handleNativeMessage = (msg) => {
    switch (msg) {
        case 'raise':
            browser.tabs.update(playerTabId, { active: true });
            break;
        case 'quit':
            browser.tabs.remove(playerTabId);
            playerTabId = null;
            break
        default:
            browser.tabs.sendMessage(playerTabId, { cmd: msg })
    }
};

const createMenu = () => {
    browser.menus.create({
        id: 'controllTab',
        title: 'Controll this tab with MPRIS-DBus',
        contexts: ['tab'],
    });
    browser.menus.onClicked.addListener(handleMenuOnClick);
};

const handleMenuOnClick = (info, tab) => {
    switch (info.menuItemId) {
        case 'controllTab':
            playerTabId = tab.id;
            break;
        default:
            break;
    }
};

const init = () => {
    const port = browser.runtime.connectNative('mpris_dbus_connector');
    port.onMessage.addListener(handleNativeMessage);
    browser.tabs.onUpdated.addListener(handleTabUpdated);
    createMenu();
};

init();