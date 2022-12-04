const handleProblemSubmission = async () => {
  console.log('Waiting for 5s');
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ done: true });
    }, 10 * 1000);
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
  } else {
    console.log('Rejected');
  }
};

const initialize = () => {
  console.log('We are on LeetCode!!');

  const buttons = document.querySelectorAll('button');

  let submitButton = null;
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (button.textContent === 'Submit') {
      submitButton = button;
    }
  }

  submitButton.addEventListener('click', handleProblemSubmission);
};

setTimeout(initialize, 6 * 1000);
