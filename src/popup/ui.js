'use strict';

// All Element imports
const statsContainer = document.getElementById('statsContainer');
const resultTable = document.getElementById('resultTable');
const formError = document.getElementById('formError');

// All UI functions
const updateStats = (content) => {
  statsContainer.innerText = content;
};

const clearFormError = () => {
  formError.innerText = '';
};

const displayFormError = (message) => {
  formError.innerText = message;
};

const clearTable = () => {
  // Clear the result container
  resultTable.innerHTML = '<p style="text-align:center">Searching...</p>';
};

const updateResultTable = (users, isEnd = false) => {
  // Recoding the users data in local storage
  setData('result', users);

  // Updating the stats container
  if (isEnd) updateStats('Search Completed!!');

  if (!users || users.length === 0) {
    resultTable.innerHTML = '<p style="text-align:center">No Data Found!!</p>';
    return;
  }

  // Clear the result container
  resultTable.innerHTML = '';

  const tableHeader = document.createElement('thead');
  // Create header for the table
  const tableHeaderHTML = `
    <tr>
      <th>Rank</th>
      <th>User</th>
      <th>Country</th>
      <th>Stats</th>
      <th>LeaderBoard</th>
    </tr>
  `;
  tableHeader.innerHTML = tableHeaderHTML;
  resultTable.appendChild(tableHeader);

  // Create body of the table
  const tableBody = document.createElement('tbody');
  users.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.rank}</td>
      <td><a class="userBtn" href="${user.profileUrl}" target="_blank">${user.username}</a></td>
      <td>${user.country_name}</td>
      <td>${user.questionsSolved}/4</td>
      <td><a class="visitBtn" href="${user.contestUrl}" target="_blank">View</a></td>
    `;

    tableBody.appendChild(row);
  });
  resultTable.appendChild(tableBody);
};
