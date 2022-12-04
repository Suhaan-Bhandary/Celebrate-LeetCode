// let audio_element = document.createElement('audio');
// audio_element.src = '../assets/music/rock-the-party.mp3';
var audio = document.getElementById('audio');

const handleMessage = (request) => {
  console.log('Handling message');
  console.log(request);

  audio.currentTime = 0;
  audio.play();
  setTimeout(() => audio.pause(), 20 * 1000);
};

chrome.runtime.onMessage.addListener(handleMessage);
