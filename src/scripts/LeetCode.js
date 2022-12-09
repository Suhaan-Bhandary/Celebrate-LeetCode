const playSong = () => {
  let url = chrome.runtime.getURL('src/assets/music/rock-the-party.mp3');
  let audio = new Audio(url);
  audio.play();

  setTimeout(() => audio.pause(), 20 * 1000);
};

const handleProblemSubmission = async () => {
  let maxTriesTillAccepted = 15;
  let timeBetweenTriesMilliseconds = 1000;

  for (let i = 0; i < maxTriesTillAccepted; i++) {
    // Waiting for timeBetweenTriesMilliseconds
    await new Promise((resolve) =>
      setTimeout(() => resolve(), timeBetweenTriesMilliseconds)
    );

    // Try getting the accepted span
    const spans = document.querySelectorAll('svg ~ span');

    // Check if the span contains the 'Accepted' textContent
    let isAccepted = false;
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].textContent === 'Accepted') {
        isAccepted = true;
        break;
      }
    }

    // If Accepted play the song and break the loop
    if (isAccepted) {
      playSong();
      break;
    }
  }
};

const initialize = () => {
  // Trying till the submit button is found
  let initializeInterval = setInterval(() => {
    // Getting all the button and finding the submit button
    const buttons = document.querySelectorAll('button');

    // Find the submit button from the buttons
    let submitButton = null;
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      if (button.textContent === 'Submit') {
        submitButton = button;
        break;
      }
    }

    // Add a event listener to the button and remove the interval if button is found
    if (submitButton) {
      submitButton.addEventListener('click', handleProblemSubmission);
      clearInterval(initializeInterval);
    }
  }, 1000);
};

window.addEventListener('load', initialize);
