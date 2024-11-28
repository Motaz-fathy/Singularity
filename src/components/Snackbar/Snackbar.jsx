import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "reactstrap";
import { AlertCircle, CheckCircle } from "react-feather";
import { usePrevious } from "../../utility/hooks/usePrevious";
import { setSnackbar } from "../../redux/actions/general";
import "./Snackbar.scss";

const Snackbar = () => {
  const { visible, message, color } = useSelector(
    (state) => state.general.snackbar
  );
  const dispatch = useDispatch();

  const prevSnackbarVisible = usePrevious(visible);

  useEffect(() => {
    if (visible && !prevSnackbarVisible) {
      setTimeout(() => {
        dispatch(
          setSnackbar({
            visible: false,
            message: "",
            color: "",
          })
        );
      }, 5000);
    }
  }, [visible]);

  return (
    <div className="snackbar_container">
      <Alert
        color={color}
        isOpen={visible}
        toggle={() =>
          dispatch(
            setSnackbar({
              visible: false,
              message: "",
              color: "",
            })
          )
        }
        className="box-shadow-1"
      >
        <div className="snackbar_msg d-flex">
          {color === "success" && <CheckCircle size={18} color="green" />}
          {color === "danger" && <AlertCircle size={18} color="red" />}
          <p>{message}</p>
        </div>
      </Alert>
    </div>
  );
};

export default Snackbar;
