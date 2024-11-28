import * as types from "../types/customers"

export const receiveCustomers = payload => ({
  type: types.RECEIVE_CUSTOMERS,
  payload
})
