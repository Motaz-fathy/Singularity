import * as apis from "../../network/apis/orders"
import * as actions from "../../redux/actions/orders"
import {dispatchSnackbarError} from "../../utility/Utils"

export const requestOrders = params => {
  return dispatch => {
    return apis.requestOrders(params).then(
      res => {
        dispatch(actions.receiveOrders(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestPaidOrders = params => {
  return dispatch => {
    return apis.requestPaidOrders(params).then(
      res => {
        dispatch(actions.receivePaidOrders(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}
