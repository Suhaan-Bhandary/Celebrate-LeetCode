const playSong = () => {
  let url = chrome.runtime.getURL('src/assets/music/rock-the-party.mp3');
  let audio = new Audio(url);
  audio.play();

  setTimeout(() => audio.pause(), 20 * 1000);
};

const handleProblemSubmission = async (count) => {
  console.log('Waiting for 5s');

  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ done: true });
    }, 1000);
  });

  console.log('Handle Problem Submission');
  console.log(data);

  // Find the accepted logo and if found play music
  const spans = document.querySelectorAll('svg ~ span');

  let isAccepted = false;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].textContent === 'Accepted') {
      isAccepted = true;
    }
  }

  if (isAccepted) {
    chrome.runtime.sendMessage({ request: 'song' });
    console.log('Accepted');
    playSong();
  } else {
    console.log('Rejected');

    // We are checking 20 times
    if (count < 15) {
      handleProblemSubmission(count + 1);
    }
  }
};

const initialize = () => {
  // We have to loop till we get the button
  let initializeInterval = setInterval(() => {
    try {
      console.log('We are on LeetCode!!');
      const buttons = document.querySelectorAll('button');

      let submitButton = null;
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.textContent === 'Submit') {
          submitButton = button;
        }
      }

      submitButton.addEventListener('click', () => handleProblemSubmission(0));

      // Removing the interval
      clearInterval(initializeInterval);
    } catch (error) {
      console.log(error);
    }
  }, 1000);
};

window.addEventListener('load', initialize);
