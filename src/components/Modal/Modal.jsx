import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "../Button/Button";
import Portal from "../Portal/Portal";
import "./Modal.scss";

const Modal = ({
  isOpen,
  title,
  content,
  onConfirm,
  onCancel,
  type,
  confirmBtnTxt,
  cancelBtnTxt,
  confirmBtnClass,
  cancelBtnClass,
  confirmBtnType,
  confirmBtnDisabled,
  showCloseBtn,
  modalWrapperClass,
  allowEscape,
  closeOnClickOutside,
}) => {
  const renderCustomBtns = () => {
    return (
      <div className="modal_btns text-center w_100">
        <Button
          label={confirmBtnTxt}
          type={confirmBtnType}
          color="primary"
          onClick={onConfirm}
          disabled={confirmBtnDisabled}
          className={confirmBtnClass}
        />
        {cancelBtnTxt && (
          <Button
            label={cancelBtnTxt}
            color="secondary"
            outline={true}
            onClick={onCancel}
            className={`${cancelBtnClass} mx-1`}
          />
        )}
      </div>
    );
  };
  return (
    <>
      {isOpen && (
        <Portal id="sweet-alert-portal">
          <SweetAlert
            show={isOpen}
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            type={type}
            showCloseButton={showCloseBtn}
            customButtons={renderCustomBtns()}
            customClass={modalWrapperClass}
            allowEscape={allowEscape}
            closeOnClickOutside={closeOnClickOutside}
          >
            {content ? <p className="modal_content">{content}</p> : ""}
          </SweetAlert>
        </Portal>
      )}
    </>
  );
};

export default Modal;

Modal.propsTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    "default",
    "info",
    "success",
    "warning",
    "danger",
    "error",
    "input",
    "custom",
    "controlled",
  ]),
  confirmBtnTxt: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  cancelBtnTxt: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  confirmBtnClass: PropTypes.string,
  cancelBtnClass: PropTypes.string,
  confirmBtnType: PropTypes.string,
  confirmBtnDisabled: PropTypes.bool,
  showCloseBtn: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  modalWrapperClass: PropTypes.string,
  allowEscape: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
};
Modal.defaultProps = {
  type: "default",
  showCloseBtn: true,
  confirmBtnType: "button",
  allowEscape: true,
  closeOnClickOutside: true,
};
