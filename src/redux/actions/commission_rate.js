import * as types from "../types/commission_rate"

export const receiveCommissionRates = payload => ({
  type: types.RECEIVE_COMMISSION_RATE,
  payload
})
