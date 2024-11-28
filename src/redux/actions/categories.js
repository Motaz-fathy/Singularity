import * as types from "../types/categories"

export const receiveCategories = payload => ({
  type: types.RECEIVE_CATEGORIES,
  payload
})
