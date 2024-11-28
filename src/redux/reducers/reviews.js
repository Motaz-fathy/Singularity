import * as types from "../types/reviews";

const INITIAL_STATE = {
  reviewsList: [],
  reviewsMetaData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_REVIEWS:
      return {
        ...state,
        reviewsMetaData: { ...action.payload.meta },
        reviewsList: [...action.payload.data],
      };
    default:
      return state;
  }
};
