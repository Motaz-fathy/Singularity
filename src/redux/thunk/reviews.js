import * as apis from "../../network/apis/reviews";
import * as actions from "../../redux/actions/reviews";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
} from "../../utility/Utils";


export const allReviews = (params) => {
    return (dispatch) => {
      return apis.getAllReviews(params).then(
        (res) => {  
             dispatch(actions.receiveReviews(res?.data));
        },
        (err) => {
          if (err.response) {
            dispatchSnackbarError(err.response.data.message);
          }
        }
      );
    };
  };
   
  export const changeReviewsRequestStatus =(payload)=>{
  return (dispatch) => {
    return apis.changeReviewRequestStatus(payload).then(
      (res) => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false,
        });
        dispatch(allReviews({ page: payload.page }));
      },
      (err) => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message);
        }
      }
    );
  };
};