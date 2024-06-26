/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    // old work by Adnan
    // <<<<<<< HEAD
    //     const url =
    //       type === 'password'
    //         ? // ? '/api/v1/users/updateMyPassword'
    //           'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
    //         : // '/api/v1/users/updateMe';
    //           'http://127.0.0.1:3000/api/v1/users/updateMe';
    // =======
    // const url = type === 'password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe';

    let url;
    if (type === 'password') {
      url = '/api/v1/users/updateMyPassword';
    } else if (type === 'picture') {
      url = '/api/v1/users/updateMyPicture';
    } else {
      url = '/api/v1/users/updateMe';
    }
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
