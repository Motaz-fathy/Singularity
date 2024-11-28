import * as apis from "../../network/apis/profile";
import * as actions from "../actions/profile";
import { loginReceive } from "../actions/auth";
import { dispatchSnackbarError, dispatchSnackbarSuccess } from "../../utility/Utils";
import auth from "../../utility/auth";

export const requestProfileInfo = () => {
  return (dispatch) => {
    return apis.requestProfileInfo().then(
      (res) => {
        dispatch(actions.receiveProfileInfo(res.data.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};
export const editProfileInfoSubmit = ({ values }) => {
  return (dispatch) => {
    return apis.editProfileInfoSubmit(values).then(
      (res) => {
        const { email, first_name, last_name, full_name, last_update, phone } = res.data.data;
        dispatchSnackbarSuccess({ msg: "CHANGES_SAVED", isMsgKey: true });

        // Getting user login data in local storage
        const userToken = localStorage.getItem("token");
        const oldUserData = JSON.parse(localStorage.getItem("userData"));
        // Updating the user data with the newely updated data
        const newUserData = {
          ...oldUserData,
          email,
          first_name,
          last_name,
          full_name,
          updated_at: last_update,
          phone,
        };
        // Updating the local storage with the new data
        localStorage.setItem("userData", JSON.stringify(newUserData));
        // Updating the store with the new data
        dispatch(loginReceive({ token: userToken, user: newUserData }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};
export const changeProfilePic = (values) => {
  return (dispatch) => {
    return apis.changeProfilePic(values).then(
      (res) => {
        const { picture, picture_url } = res.data.data;
        const userToken = localStorage.getItem("token");
        const oldUserData = JSON.parse(localStorage.getItem("userData"));
        // Updating the user data with the newely updated data
        const newUserData = {
          ...oldUserData,
          picture,
          picture_url,
        };
        // Updating the local storage with the new data
        localStorage.setItem("userData", JSON.stringify(newUserData));
        // Updating the store with the new data
        dispatch(loginReceive({ token: userToken, user: newUserData }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};
export const changeEmailSubmit = ({ values, resetForm }) => {
  return (dispatch) => {
    return apis.changeEmailSubmit(values).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        resetForm();
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};
export const confirmEmailChangeRequest = ({ token, history }) => {
  return (dispatch, getState) => {
    return apis.confirmEmailChangeRequest(token).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        if (history) {
          auth.logout();
          dispatch(loginReceive({ token: "", user: {} }));
          const lang = getState().general.lang;
          history.push(`/${lang}/login`);
        }
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};
export const changePasswordSubmit = ({ values, history }) => {
  return (dispatch, getState) => {
    return apis.changePasswordSubmit(values).then(
      (res) => {
        dispatchSnackbarSuccess({ msg: res.data.message, isMsgKey: false });
        auth.logout();
        dispatch(loginReceive({ token: "", user: {} }));
        const lang = getState().general.lang;
        history.push(`/${lang}/login`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};
