import * as types from "../types/service_providers"

export const receiveServiceProviders = payload => ({
  type: types.RECEIVE_SERVICE_PROVIDERS,
  payload
})
