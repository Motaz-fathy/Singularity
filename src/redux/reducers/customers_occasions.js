import * as types from "../types/customers_occasions";

const INITIAL_STATE = {
  customersList: [],
  customersMetaData: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_CUSTOMERS_OCCASIONS:
      return {
        ...state,
        customersMetaData: { ...action.payload?.meta },
        customersList: [...action?.payload?.data],
      };
    default:
      return state;
  }
};
