import throttle from "lodash.throttle";
import Player from '@vimeo/player';

const iframe = document.querySelector("#vimeo-player");

const player = new Player(iframe);
player.on(
    "timeupdate", throttle(function (time) {
    console.log(time);
    localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
    }), 1000);
savedTime();
function savedTime() {
    const savedTimeVideo = localStorage.getItem('videoplayer-current-time');
    const parcedsavedTimeVideo = JSON.parse(savedTimeVideo);
    if (savedTimeVideo) {
       player.setCurrentTime(parcedsavedTimeVideo.seconds); 
    }

}
