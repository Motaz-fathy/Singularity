import * as types from "../types/orders"

const INITIAL_STATE = {
  ordersList: [],
  ordersMetaData: {},
  statusCount: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_ORDERS:
      return {
        ...state,
        ordersMetaData: { ...action.payload.meta },
        ordersList: [...action.payload.data],
        status_count: [...action.payload.status_count]
      }
    case types.RECEIVE_PAID_ORDERS:
      return {
        ...state,
        ordersMetaData: { ...action.payload.meta },
        ordersList: [...action.payload.data],
        status_count: [...action.payload.status_count]
      }
    default:
      return state
  }
}
