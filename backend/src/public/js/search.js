/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const search = async (selectedTags) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/search/searchResult',
      data: {
        selectedTags,
      },
    });

    if (res.data.status === 'success') {
      console.log('success');
      //   showAlert('success', 'Logged in successfully!');
      //   window.setTimeout(() => {
      //     location.assign('/me');
      //   }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
