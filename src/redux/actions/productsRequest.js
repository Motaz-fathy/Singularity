import * as types from "../types/productsRequests"

export const receiveProducts = payload => ({
  type: types.RECEIVE_PRODUCTS_REQUEST,
  payload
})
