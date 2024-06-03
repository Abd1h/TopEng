/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const AppError = require('./../../utils/appError');

export const search = async (selectedTags) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/search/getSearchResults',
      data: {
        selectedTags,
      },
    });
    if (res.data.status === 'success' && res.data.data.searchResults.length != 0) {
      // If the POST request is successful, redirect to the result page
      window.location.href = '/searchresults';
    } else {
      throw new Error('no matching results. Please adjust your search.');
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};
