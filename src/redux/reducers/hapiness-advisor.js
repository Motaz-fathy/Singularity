import * as types from "../types/hapiness-advisor";

const INITIAL_STATE = {
  advisorList: [],
  advisorMetaData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_SUGGESTIONS:
      return {
        ...state,
        advisorMetaData: { ...action.payload.meta },
        advisorList: [...action.payload.data],
      };
    default:
      return state;
  }
};
