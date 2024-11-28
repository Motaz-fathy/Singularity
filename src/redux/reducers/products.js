import * as types from "../types/products"

const INITIAL_STATE = {
  productsList: [],
  productsMetaData: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return {
        ...state,
        productsMetaData: { ...action.payload.meta },
        productsList: [...action.payload.data]
      }
    default:
      return state
  }
}
