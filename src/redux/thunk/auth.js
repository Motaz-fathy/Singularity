import * as apis from "../../network/apis/auth";
import auth from "../../utility/auth";
import * as actions from "../actions/auth";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const loginRequest = ({ values, history }) => {

  return (dispatch, getState) => {
    return apis.loginRequest(values).then(
      (res) => {
        const { token, user } = res.data.data;
        dispatch(actions.loginReceive({ token, user }));
        auth.login({ token, user, rememberMe: values.rememberMe });
        if (localStorage.getItem("prevPath")) {
          history.push(localStorage.getItem("prevPath"));
          localStorage.removeItem("prevPath");
        } else {
          const lang = getState().general.lang;
          history.push(`/${lang}/home`);
        }
      },
      (err) => {
        dispatchSnackbarError(err.response.data.message);
      }
    );
  };
};

export const forgetPasswordResetLinkRequest = (values) => {
  return () => {
    return apis.forgetPasswordResetLinkRequest(values).then(
      (res) => {
        dispatchSnackbarSuccess({ msg: res.data.message, isMsgKey: false });
      },
      (err) => {
        dispatchSnackbarError(err.response.data.message);
      }
    );
  };
};
export const resetPasswordRequest = ({ values, history }) => {
  return (dispatch, getState) => {
    return apis.resetPasswordRequest(values).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/login`);
      },
      (err) => {
        dispatchSnackbarError(err.response.data.message);
      }
    );
  };
};

export const logoutRequest = (history) => {
  return (dispatch, getState) => {
    return apis.logoutRequest().then(
      () => {
        auth.logout();
        dispatch(actions.loginReceive({ token: "", user: {} }));
        const lang = getState().general.lang;
        history.push(`/${lang}/login`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
