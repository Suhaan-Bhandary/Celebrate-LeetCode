'use strict';

const highlightLeaderBoard = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const rank = urlParams.get('rank');

  if (!rank) {
    console.log('Highlight Rank not Found');
    return;
  }

  // Highlight the row of the table
  const rows = document.querySelectorAll('tr');
  for (const row of rows) {
    if (row.firstChild.textContent === rank) {
      console.log('Highlighting the Rank Row!!');
      row.style.backgroundColor = '#ffbf49';
      break;
    }
  }
};

window.addEventListener('load', highlightLeaderBoard);
