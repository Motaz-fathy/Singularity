import * as apis from "../../network/apis/customers";
import * as actions from "../../redux/actions/customers";
import {dispatchSnackbarError, dispatchSnackbarSuccess,} from "../../utility/Utils";

export const requestCustomers = (params) => {
    return (dispatch) => {
        return apis.requestCustomers(params).then(
            (res) => {
                dispatch(actions.receiveCustomers(res.data));
            },
            (err) => {
                if (err.response) {
                    dispatchSnackbarError(err.response.data.message);
                }
            }
        );
    };
};

// view customer
export const viewCustomer = ({customerId, history}) => {
    return (dispatch, getState) => {
        return apis.getCustomerDetails(customerId).then(
            (res) => {
                dispatchSnackbarSuccess({
                    msg: res.data.message,
                    isMsgKey: false,
                });
                const lang = getState().general.lang;
                history.push(`/${lang}/view`);
            },
            (err) => {
                if (err.response) {
                    dispatchSnackbarError(err.response.data.message);
                }
            }
        );
    };
};
