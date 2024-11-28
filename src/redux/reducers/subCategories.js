import * as types from "../types/subcategory";

const INITIAL_STATE = {
  subcategoriesList: [],
  subcategoriesMetaData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_SUBCATEGORY:
      return {
        ...state,
        subcategoriesMetaData: { ...action.payload.meta },
        subcategoriesList: [...action.payload.data],
      };
    default:
      return state;
  }
};
