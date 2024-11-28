import * as apis from "../../network/apis/hapiness-advisor";
import * as actions from "../../redux/actions/hapiness-advisor";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";


export const allSuggestions = (params) => {
    return (dispatch) => {
      return apis.allSuggestions(params).then(
        (res) => {
          console.log({res})
          dispatch(actions.receiveSuggestions(res?.data));
        },
        (err) => {
          if (err.response) {
            dispatchSnackbarError(err.response.data.message);
          }
        }
      );
    };
  };
   
  export const changeAdviserRequestStatus =(payload)=>{
  return (dispatch) => {
    return apis.changeAdviserRequestStatus(payload).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        dispatch(allSuggestions({ page: payload.page }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};