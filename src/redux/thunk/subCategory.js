import * as apis from "../../network/apis/subCategory";
import * as actions from "../../redux/actions/subcategory";
import { dispatchSnackbarError, dispatchSnackbarSuccess } from "../../utility/Utils";

export const requestSubcategory = (params) => {
  return (dispatch) => {
    return apis.getAllSubCategories(params).then(
      (res) => {
        dispatch(actions.receiveSubCategory(res.data));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};

// add subcategory
export const addSubcategory = ({ data, history }) => {
  console.log({data})
  return (dispatch, getState) => {
    return apis.addSubcategoryRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/subcategory`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};

export const editSubcategory = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.editSubcategoryRequest(data).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        const lang = getState().general.lang;
        history.push(`/${lang}/subcategory`);
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      },
    );
  };
};


export const activateDeactivateSubCategory = (payload) => {
  return (dispatch) => {
    return apis.changeSubCategoryStatus(payload).then(
      () => {
        dispatch(requestSubcategory({ page: 1 }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
