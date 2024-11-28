import * as apis from "../../network/apis/categories";
import * as actions from "../../redux/actions/categories";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const getAllCategories = (params) => {
  return (dispatch) => {
    return apis.getAllCategories(params).then(
      (res) => {
        dispatch(actions.receiveCategories(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};

export const activateDeactivateCategory = (payload) => {
  console.log({ payload });
  return (dispatch) => {
    return apis.changeCategoryStatus(payload).then(
      () => {
        dispatch(getAllCategories({ page: 1 }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};




// add subcategory
export const addCategory = ({ data, history }) => {
  console.log('dataa',data)
  return (dispatch, getState) => {
    return apis.addCategoryRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/category`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};

export const editCategory = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.editCategoryRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/category`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};

