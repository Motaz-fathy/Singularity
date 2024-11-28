import * as apis from "../../network/apis/commission_rate";
import * as actions from "../actions/commission_rate";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const getAllCommissions = (params) => {
 
  return (dispatch) => {
    return apis.getAllCommissions(params).then(
      (res) => {
        dispatch(actions.receiveCommissionRates(res?.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};


// add COMMISSION RATE
export const addCommissionRate = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.addCommissionRateRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/commissions`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};

export const editCommssionRate = ({ data, history }) => {
  
  return (dispatch, getState) => {
    return apis.editCommissionRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/commissions`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};

