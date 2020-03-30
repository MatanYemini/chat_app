import axios from 'axios';
import { loadUser } from './auth';
import {
  ADD_CHANNEL,
  ADD_CHANNEL_FAIL,
  GET_CHANNELS,
  CHANNELS_ERROR
} from './types';

// Add Channel
export const addChannel = ({ title, details }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ title, details });

  try {
    const res = await axios.post('api/channel/add', body, config);
    dispatch({
      type: ADD_CHANNEL,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: ADD_CHANNEL_FAIL
    });
    if (error && error.response && error.response.data) {
      return error.response.data.msg;
    }
  }
};

// Get user's channels
export const getUserChannels = () => async dispatch => {
  try {
    const res = await axios.get('/api/channel/');
    dispatch({
      type: GET_CHANNELS,
      payload: res.data
    });
    if (res && res.data && res.data.channels) {
      return res.data.channels;
    } else {
      return [];
    }
  } catch (error) {
    dispatch({
      type: CHANNELS_ERROR
    });
    if (error.response.data) {
      return error.response.data.msg;
    }
  }
};
