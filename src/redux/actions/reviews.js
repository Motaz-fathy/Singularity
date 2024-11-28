import * as types from "../types/reviews"

export const receiveReviews = payload => ({
  type: types.RECEIVE_REVIEWS,
  payload
})
