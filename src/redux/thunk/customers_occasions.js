import * as apis from "../../network/apis/customers_occasions";
import * as actions from "../actions/customers_occasions";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";

export const requestCustomersOccasions = (params) => {
  return (dispatch) => {
    return apis.requestCustomersOccasions(params).then(
      (res) => {
        dispatch(actions.receiveCustomersOccasions(res.data));
        
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};
