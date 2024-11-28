import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import "./Switch.scss";

const Switch = forwardRef((props, ref) => {
  const {
    name,
    onLabel,
    offLabel,
    label,
    required,
    switchClass,
    labelClass,
    formGroupClass,
    onChange,
    id,
    checked,
    disabled,
  } = props;
  return (
    <>
      <FormGroup className={`${formGroupClass}`}>
        {label && (
          <Label
            className={`form-label f_size_12 mb-1 ${labelClass}`}
          >{`${label} ${required ? "*" : ""}`}</Label>
        )}
        <div>
          <label className={`switch ${switchClass}`}>
            <input
              ref={ref}
              name={name}
              type="checkbox"
              id={id || name}
              onChange={onChange}
              checked={checked}
              disabled={disabled}
            />
            <div className="slider round">
              {onLabel && <span className="on f_size_12">{onLabel}</span>}
              {offLabel && <span className="off f_size_12">{offLabel}</span>}
            </div>
          </label>
        </div>
      </FormGroup>
    </>
  );
});

export default Switch;

Switch.propTypes = {
  onLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  offLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  required: PropTypes.bool,
  switchClass: PropTypes.string,
  labelClass: PropTypes.string,
  formGroupClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};
