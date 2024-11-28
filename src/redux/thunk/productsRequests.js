import * as apis from "../../network/apis/productsRequests";
import * as actions from "../../redux/actions/productsRequest";
import { dispatchSnackbarError, dispatchSnackbarSuccess } from "../../utility/Utils";

export const requestProducts = (params) => {
  return (dispatch) => {
    return apis.allProductsRequests(params).then(
      (res) => {
        dispatch(actions.receiveProducts(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};


export const activateDeactivateProduct = (payload) => {
  return (dispatch) => {
    return apis.activateDeactivateProductRequests(payload).then(
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
      },
    );
  };
};

// add product
export const addProduct = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.addProductRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/products/products-request`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};


// edit product
export const editProductRequest = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.editProductRequst(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/products/products-request`);
        
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};




// CHANGE  product STATUS
export const changeProductRequestStatus = ( id,status, history ) => {
  console.log({ id },{status});
  console.log({ history });
  return (dispatch, getState) => {
    return apis.changeProductStatus(id,status).then(
      (res) => {
        console.log({res})
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/products/products-request`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
