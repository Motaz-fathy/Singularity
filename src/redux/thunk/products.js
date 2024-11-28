import * as apis from "../../network/apis/products";
import * as actions from "../../redux/actions/products";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const allProducts = (params) => {
  return (dispatch) => {
    return apis.allProducts(params).then(
      (res) => {
        dispatch(actions.receiveProducts(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
export const requestProducts = (params) => {
  return (dispatch) => {
    return apis.allProducts(params).then(
      (res) => {
        dispatch(actions.receiveProducts(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

export const activateDeactivateProduct = (payload) => {
  return (dispatch) => {
    return apis.activateDeactivateProduct(payload).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        dispatch(requestProducts({ page: payload.page }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

// add product
export const addProduct = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.addProduct(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/products/all`);
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
export const editProduct = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.editProduct(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/products/all`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
