import * as apis from "../../network/apis/packages";
import * as actions from "../../redux/actions/packages";
import {dispatchSnackbarError, dispatchSnackbarSuccess,} from "../../utility/Utils";

export const requestPackages = (params) => {
  return (dispatch) => {
    return apis.requestPackages(params).then(
      (res) => {
        dispatch(actions.receivePackages(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

// add package
export const addPackage = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.addPackageRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/packages`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
// edit product
export const editPackage = ({ data, history }) => {
  console.log(data);
  return (dispatch, getState) => {
    return apis.editPackageRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        // dispatch(actions.receivePackages(null));
        const lang = getState().general.lang;

        history.push(`/${lang}/packages`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

export const activateDeactivatePackage = (payload) => {
  return (dispatch) => {
    return apis.activateDeactivatePackage(payload).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        dispatch(requestPackages({ page: payload.page }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

export const deletePackageProduct = (payload) => {
  return apis.deleteProductFromPackage(payload).then(
    (res) => {
      dispatchSnackbarSuccess({
        msg: res.data.message,
        isMsgKey: false,
      });
    },
    (err) => {
      if (err.response) {
        dispatchSnackbarError(err.response.data.message);
      }
    }
  );
};
