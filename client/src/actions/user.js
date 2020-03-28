import axios from 'axios';
//import { setAlert } from './alert';
import { loadUser } from './auth';

import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('api/users/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL
    });
    if (error.response.data) {
      return error.response.data.msg;
    }
  }
};
