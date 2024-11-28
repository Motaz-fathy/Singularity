import * as types from "../types/coupons";

const INITIAL_STATE = {
  couponsList: [],
  couponsMetaData: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_COUPONS:
      return {
        ...state,
        couponsMetaData: { ...action.payload?.meta },
        couponsList: [...action?.payload?.data],
      };
    default:
      return state;
  }
};
