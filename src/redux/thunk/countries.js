import * as apis from "../../network/apis/countries";
import * as actions from "../actions/countries";
import { dispatchSnackbarError } from "../../utility/Utils";

export const as = () => (dispatch) => {
  return apis.requestAllCountries().then(
    (res) => {
      dispatch(actions.receiveCountries(res.data));
    },
    (err) => {
      if (err.response) {
        dispatchSnackbarError(err.response.data.message);
      }
    }
  );
};
