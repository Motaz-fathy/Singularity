import * as types from "../types/customers_occasions"

export const receiveCustomersOccasions = payload => ({
  type: types.RECEIVE_CUSTOMERS_OCCASIONS,
  payload
})
