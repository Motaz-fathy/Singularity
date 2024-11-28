import * as types from "../types/packages"

const INITIAL_STATE = {
  packagesList: [],
  packagesMetaData: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_PACKAGES:
      return {
        ...state,
        packagesMetaData: {...action.payload.meta},
        packagesList: [...action.payload.data]
      }
    default:
      return state
  }
}
