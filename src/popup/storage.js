'use strict';

const getData = async (key) => {
  return await new Promise((resolve, reject) => {
    chrome.storage.local
      .get([key])
      .then((result) => resolve(result[key]))
      .catch((err) => reject(null));
  });
};

const setData = async (key, value) => {
  return await new Promise((resolve, reject) => {
    chrome.storage.local
      .set({ [key]: value })
      .then(() => resolve(value))
      .catch((err) => reject(null));
  });
};
