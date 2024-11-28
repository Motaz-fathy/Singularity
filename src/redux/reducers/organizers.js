import * as types from "../types/organizers";

const INITIAL_STATE = {
  organizersList: [],
  organizersMetaData: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_ORGANIZERS:
      return {
        ...state,
        organizersMetaData: { ...action.payload?.meta },
        organizersList: [...action?.payload?.data],
      };
    default:
      return state;
  }
};
