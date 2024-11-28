import * as apis from "../../network/apis/coupons";
import * as actions from "../actions/coupons";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const requestCoupons = (params) => {
  return (dispatch) => {
    return apis.requestCoupons(params).then(
      (res) => {
        dispatch(actions.receiveCoupons(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

export const activateDeactivateStatus = (payload) => {
  console.log({ payload });
  return (dispatch) => {
    return apis.changeCouponsStatus(payload).then(
      () => {
        dispatch(requestCoupons({ page: 1 }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

// add Coupon
export const addCuopon = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.addCuopon(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });

        const lang = getState().general.lang;
        history.push(`/${lang}/coupons`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

export const editCoupons = ({ data, history }) => {
  return (dispatch, getState) => {
    
    return apis.editCouponsRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/coupons`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
