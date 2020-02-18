const scriptId = 'page-script';

const injectScript = () => {
    // Create and inject script tag to the page - hack to access dzPlayer object
    const pageScript = document.createElement('script');
    pageScript.id = scriptId;

    // TODO: Send current song data to content.js
    pageScript.innerHTML = `window.addEventListener('message', function(m) {
        switch (m.data) {
            case 'play':
                window.dzPlayer.control.play();
                break;
            case 'pause':
                window.dzPlayer.control.pause();
                break;
            case 'playPause':
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
};