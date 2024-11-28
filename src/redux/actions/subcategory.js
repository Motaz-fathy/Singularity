import * as types from "../types/subcategory";

export const receiveSubCategory = (payload) => ({
  type: types.RECEIVE_SUBCATEGORY,
  payload,
});
