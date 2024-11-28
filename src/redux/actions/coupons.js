import * as types from "../types/coupons"

export const receiveCoupons = payload => ({
  type: types.RECEIVE_COUPONS,
  payload
})
