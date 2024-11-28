import * as types from "../types/service_providers"

const INITIAL_STATE = {
  serviceProvidersList: [],
  serviceProvidersMetaData: {},
  startingDate: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_SERVICE_PROVIDERS:
      return {
        ...state,
        serviceProvidersMetaData: { ...action.payload.meta },
        serviceProvidersList: [...action.payload.data],
        startingDate: action.payload.data[0]
          ? action.payload.data[0].registration_date
          : null
      }
    default:
      return state
  }
}
