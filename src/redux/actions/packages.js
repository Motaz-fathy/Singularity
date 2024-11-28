import * as types from "../types/packages"

export const receivePackages = payload => ({
  type: types.RECEIVE_PACKAGES,
  payload
})

