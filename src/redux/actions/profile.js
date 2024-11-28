import * as types from "../types/profile";

export const receiveProfileInfo = (payload) => ({
  type: types.RECEIVE_PROFILE_INFO,
  payload,
});
