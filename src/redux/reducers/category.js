import * as types from "../types/categories";

const INITIAL_STATE = {
  categoryList: [],
  categoryMetaData: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_CATEGORIES:
      return {
        ...state,
        categoryMetaData: { ...action.payload?.meta },
        categoryList: [...action?.payload?.data],
      };
    default:
      return state;
  }
};
