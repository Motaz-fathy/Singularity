import * as apis from "../../network/apis/service_providers_requests";
import * as actions from "../actions/service_providers_requests";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const requestServiceProvidersRegReq = (params) => {
  return (dispatch) => {
    return apis.requestServiceProvidersRegRequests(params).then(
      (res) => {
        dispatch(actions.receiveServiceProvidersRegRequests(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

// edit SP request
export const editServiceProviderRegRequest = ({ data, id, history }) => {
  return (dispatch, getState) => {
    return apis.editServiceProviderRegisterRequest(data, id).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/Pending_requests`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

// change SP request status to approve
export const ApproveServiceProviderRegRequest = (params) => {
  return (dispatch) => {
    return apis.ApproveStatusSpRegRequest(params).then(
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
};

// change SP request status to reject
export const RejectServiceProviderRegRequest = (params) => {
  return (dispatch) => {
    return apis.RejectStatusSpRegRequest(params).then(
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
};

export const ChangeServiceProviderRegRequest = (id, status) => {
  return (dispatch) => {
    return apis.ChangeStatusSpRegRequest(id, status).then(
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
};
