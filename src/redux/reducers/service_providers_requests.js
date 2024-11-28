import * as types from "../types/service_providers_requests";

const INITIAL_STATE = {
  serviceProvidersRegReqList: [],
  serviceProvidersRegReqMetaData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_SERVICE_PROVIDERS_REG_REQUESTS:
      return {
        ...state,
        serviceProvidersRegReqMetaData: { ...action.payload.meta },
        serviceProvidersRegReqList: [...action.payload.data],
      };
    default:
      return state;
  }
};
