import * as types from "../types/profile";

const INITIAL_STATE = {
  viewProfileInfo: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_PROFILE_INFO:
      return {
        ...state,
        viewProfileInfo: { ...action.payload },
      };
    default:
      return state;
  }
};
