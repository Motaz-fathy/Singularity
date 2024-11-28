import * as types from "../types/service_providers_requests";

export const receiveServiceProvidersRegRequests = (payload) => ({
  type: types.RECEIVE_SERVICE_PROVIDERS_REG_REQUESTS,
  payload,
});
