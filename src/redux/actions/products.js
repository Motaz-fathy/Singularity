import * as types from "../types/products"

export const receiveProducts = payload => ({
  type: types.RECEIVE_PRODUCTS,
  payload
})
