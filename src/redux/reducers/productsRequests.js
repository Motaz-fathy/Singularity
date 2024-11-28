import * as types from "../types/productsRequests"

const INITIAL_STATE = {
    productRequestsList: [],
    productsRequestMetaData: {}
}

export default (state = INITIAL_STATE, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case types.RECEIVE_PRODUCTS_REQUEST:
      return {
        ...state,
        productsRequestMetaData: { ...action.payload.meta },
        productRequestsList: [...action.payload.data]
      }
    default:
      return state
  }
}
