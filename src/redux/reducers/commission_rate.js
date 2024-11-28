import * as types from "../types/commission_rate";

const INITIAL_STATE = {
  commissionList: [],
  commissionMetaData: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_COMMISSION_RATE:
      return {
        ...state,
        commissionMetaData: { ...action.payload?.meta },
        commissionList: [...action?.payload?.data],
      };
    default:
      return state;
  }
};
