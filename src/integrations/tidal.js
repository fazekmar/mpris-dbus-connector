browser.runtime.onMessage.addListener(({ cmd }) => {
    switch (cmd) {
        case 'play':
            clickButton('Play');
            break;
        case 'pause':
            clickButton('Pause');
            break;
        case 'playPause':
            clickButton('Pause|Play');
            break;
        case 'next':
            clickButton('Next');
            break;
        case 'previous':
            clickButton('Previous');
            break;    
        default:
            console.log('Operation not supported');
    }
});

const clickButton = (title) => {
    [...document.getElementsByClassName('playback-controls__button--white-icon')].find((btn) => btn.title.match(title)).click();
}