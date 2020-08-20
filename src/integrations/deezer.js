const scriptId = "page-script";

const injectScript = () => {
  // Create and inject script tag to the page - hack to access dzPlayer object
  const pageScript = document.createElement("script");
  pageScript.id = scriptId;

  pageScript.innerHTML = `window.addEventListener('message', function(m) {
        if (m.data.dir !== "backgroundScript") {
            return;
        }

        switch (m.data.cmd) {
            case 'play':
                window.dzPlayer.control.play();
                break;
            case 'pause':
                window.dzPlayer.control.pause();
                break;
            case 'playpause':
                window.dzPlayer.control.togglePause();
                break;
            case 'next':
                dzPlayer.control.nextSong();
                break;
            case 'previous':
                dzPlayer.control.prevSong();
            case 'stop':
                dzPlayer.control.stop();
                break;
            default:
                console.log('Operation not supported');
        }
    });`;

  document.body.appendChild(pageScript);
};

if (!document.getElementById(scriptId)) {
  injectScript();
}
