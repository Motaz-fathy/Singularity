import * as types from "../types/orders"

export const receiveOrders = payload => ({
  type: types.RECEIVE_ORDERS,
  payload
})

export const receivePaidOrders = payload => ({
  type: types.RECEIVE_PAID_ORDERS,
  payload
})
