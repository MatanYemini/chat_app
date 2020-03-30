import {
  CHANNELS_ERROR,
  GET_CHANNELS,
  ADD_CHANNEL,
  ADD_CHANNEL_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  channels: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHANNEL:
    case GET_CHANNELS:
      return {
        ...state,
        channels: payload.channels,
        loading: false
      };
    case ADD_CHANNEL_FAIL:
      return {
        ...state,
        loading: false
      };
    case CHANNELS_ERROR:
      return {
        ...state,
        channels: [],
        loading: false
      };

    default:
      return state;
  }
}
