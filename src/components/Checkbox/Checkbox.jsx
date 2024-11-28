import React, { useContext } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import PropTypes from "prop-types";
import { IntlContext } from "../../utility/context/Internationalization";
import "./Checkbox.scss";

const Checkbox = ({
  name,
  id,
  label,
  onChange,
  value,
  disabled,
  checked,
  isInputHasErr,
  errMsg,
  formGroupClass,
  labelClass,
  errClass,
  inputClass,
}) => {
  const { messages } = useContext(IntlContext);
  return (
    <>
      <FormGroup check className={`${formGroupClass}`}>
        <Input
          type="checkbox"
          name={name}
          id={id || name}
          onChange={onChange}
          disabled={disabled}
          checked={checked}
          value={value}
          className={`pointer ${inputClass}`}
        />
        <Label check className={`pointer f_size_14 mx-h ${labelClass}`} for={id || name}>
          {label}
        </Label>
        {isInputHasErr && (
          <p className={`error_text f_size_12 ${errClass}`}>
            {messages.ERRORS[errMsg]}
          </p>
        )}
      </FormGroup>
    </>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  isInputHasErr: PropTypes.bool,
  errMsg: PropTypes.string,
  formGroupClass: PropTypes.string,
  labelClass: PropTypes.string,
  errClass: PropTypes.string,
  inputClass: PropTypes.string,
};
