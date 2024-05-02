/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const AppError = require('./../../utils/appError');

export const search = async (selectedTags) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/search/getSearchResults',
      data: {
        selectedTags,
      },
    });
    console.log(12121, res.data);

    // if (res.data.status === 'success') {
    //   const req = await axios({
    //     method: 'GET',
    //     url: 'http://127.0.0.1:3000/searchresults',
    //     data: {
    //       selectedTags,
    //     },
    //   });
    if (res.data.status === 'success') {
      // If the POST request is successful, redirect to the new page
      window.location.href = 'http://127.0.0.1:3000/searchresults';
      console.log('sending get request to searchresults page');
    } else {
      console.error('Error in search');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
