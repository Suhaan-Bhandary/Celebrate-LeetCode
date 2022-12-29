'use strict';

// Function to get the form data from the form
const getFormData = () => {
  const contestTypes = document.getElementById('contestType').value;
  const contestNumber = document.getElementById('contestNumber').value;
  const contest = `${contestTypes}-${contestNumber}`;

  const userName = document.getElementById('userName').value.toLowerCase();
  const limit = document.getElementById('resultLimit').value;
  
  const USER_PER_PAGE = 25;
  const startRank = document.getElementById('startRank').value;
  const startPage = Math.floor(startRank / USER_PER_PAGE) + 1;

  return { contest, userName, limit, startPage };
};

// Function to get the data of the contest and display it
const handleContestDataSearch = async () => {
  // Get the results
  const { contest, userName, limit, startPage } = getFormData();
  if (userName.length === 0) {
    displayFormError('*Please Enter a user name to search');
    return;
  }

  // Clear any form error messages
  clearFormError();

  const result = await searchUsers(contest, userName, limit, startPage);

  // Update the result table ui
  updateResultTable(result, true);
};

// Function to load the previous results
const loadTableFromHistory = async () => {
  // Get result from the history
  const result = await getData('result');
  if (!result || result.length === 0) {
    updateStats('No Search Data, Start Searching!!');
    return;
  }

  // Updating the table
  updateStats('Previous Search Results');
  updateResultTable(result);
};

// Add event listener to the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', handleContestDataSearch);

// Loading the table from history
loadTableFromHistory();
