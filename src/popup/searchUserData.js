'use strict';

const fetchPagesData = async (contest, startPage, sizeOfFetch, lastPage) => {
  try {
    // Get the first n pages
    const pagesRequest = [];
    for (let i = startPage; i < startPage + sizeOfFetch && i <= lastPage; i++) {
      const url = `https://leetcode.com/contest/api/ranking/${contest}/?pagination=${i}&region=global`;
      pagesRequest.push(fetch(url));
    }

    let pagesResponse = await Promise.all(pagesRequest);
    pagesResponse = pagesResponse.map((page) => page.json());

    const pagesJsonData = await Promise.all(pagesResponse);

    return pagesJsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const isContestValid = async (contest) => {
  const USER_PER_PAGE = 25;

  try {
    const dataArray = await fetchPagesData(contest, 1, 1, 1000);
    const data = dataArray[0];
    const userData = data.total_rank;

    if (!userData || userData.length === 0) {
      throw new Error('Not data found for the contest');
    }

    return {
      isValid: true,
      lastPage: Math.ceil(data.user_num / USER_PER_PAGE),
    };
  } catch (error) {
    console.log(error);
    return { isValid: false, lastPage: 0 };
  }
};

const searchUsers = async (contest, searchQuery, limit, startPage = 1) => {
  // First Fetch a single page from the server
  const { isValid, lastPage } = await isContestValid(contest);

  if (!isValid) {
    displayFormError('*Please Enter a valid Contest');
    return;
  }

  const PAGES_PER_FETCH = 50;
  const WAIT_TIME_BETWEEN_FETCH_SECONDS = 5;
  const WAIT_TIME_ON_ERROR_SECONDS = 15;

  let result = [];
  clearTable();

  for (let page = startPage; page <= lastPage; page += PAGES_PER_FETCH) {
    try {
      // Updating the stats container with new text
      updateStats(
        `Fetching page: ${page} to ${
          page + PAGES_PER_FETCH - 1
        } of ${lastPage} pages`
      );

      // Get the pages data
      let pagesJsonData = await fetchPagesData(
        contest,
        page,
        PAGES_PER_FETCH,
        lastPage
      );

      // Filter all the data from the pagesJsonData
      for (let i = 0; i < pagesJsonData.length; i++) {
        let data = pagesJsonData[i];
        let userData = data.total_rank;

        // If no further data is available, return result
        if (userData.length === 0) return result;

        // Add extra fields to the user data
        userData = userData.map((user, idx) => ({
          ...user,
          country_name: !user.country_name ? 'Unknown' : user.country_name,
          questionsSolved: Object.keys(data.submissions[idx]).length,
          profileUrl: `https://leetcode.com/${user.username}/`,
          contestUrl: `https://leetcode.com/contest/${contest}/ranking/${
            page + i
          }/?rank=${user.rank}`,
        }));

        // Filter the data with searchQuery
        const filteredData = userData.filter(({ username }) => {
          if (!username) return false;
          return username.toLowerCase().includes(searchQuery);
        });

        // If filtered is not empty, update result
        if (filteredData && filteredData.length > 0) {
          if (result.length + filteredData.length >= limit) {
            const remainingToAdd = limit - result.length;
            result = result.concat(filteredData.slice(0, remainingToAdd));
            return result;
          }

          result = result.concat(filteredData);
          updateResultTable(result);
        }
      }

      // Waiting for some seconds before making another request
      await new Promise((res) => {
        setTimeout(() => res(), WAIT_TIME_BETWEEN_FETCH_SECONDS * 1000);
      });
    } catch (error) {
      console.log(error);
      // Waiting for some seconds after an error occurs, to avoid 402 errors
      await new Promise((res) => {
        setTimeout(() => res(), WAIT_TIME_ON_ERROR_SECONDS * 1000);
      });
    }
  }

  return result;
};
