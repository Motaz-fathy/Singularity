import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IntlContext } from "../../utility/context/Internationalization";
import "./PhoneCountryInput.scss";

const PhoneCountryInput = ({
  value,
  name,
  id,
  label,
  defaultCountry,
  required,
  placeholder,
  disabled,
  disableDropdown,
  enableSearch,
  onChange,
  wrapperClass,
  containerClass,
  formGroupClass,
  labelClass,
  inputClass,
  buttonClass,
  dropdownClass,
  isInputHasErr,
  errClass,
  errMsg,
}) => {
  const { messages } = useContext(IntlContext);
  return (
    <div className={`phone_input_wrapepr ${wrapperClass}`}>
      <FormGroup className={formGroupClass}>
        {label && (
          <Label
            className={`form-label f_size_12 ${labelClass}`}
            for={id || name}
          >
            {`${label} ${required ? "*" : ""}`}
          </Label>
        )}
        <PhoneInput
          country={defaultCountry}
          preferredCountries={[defaultCountry]}
          value={typeof value !== "string" ? value.toString() : value}
          placeholder={placeholder}
          inputProps={{
            name,
            id,
          }}
          disabled={disabled}
          disableDropdown={disableDropdown}
          enableSearch={enableSearch}
          onChange={(value, country, e, formattedValue) => {
            onChange(formattedValue, value, country, e);
          }}
          containerClass={`phone_input_container ${containerClass}`}
          inputClass={`phone_input ${inputClass}`}
          buttonClass={`phone_btn ${buttonClass}`}
          dropdownClass={`phone_dropdown ${dropdownClass}`}
        />
        {isInputHasErr && (
          <p className={`error_text f_size_12 ${errClass}`}>
            {messages.ERRORS[errMsg]}
          </p>
        )}
      </FormGroup>
    </div>
  );
};

export default PhoneCountryInput;

PhoneCountryInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  defaultCountry: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  disableDropdown: PropTypes.bool,
  enableSearch: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  wrapperClass: PropTypes.string,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  formGroupClass: PropTypes.string,
  labelClass: PropTypes.string,
  buttonClass: PropTypes.string,
  dropdownClass: PropTypes.string,
  isInputHasErr: PropTypes.bool,
  errClass: PropTypes.string,
  errMsg: PropTypes.string,
};
PhoneCountryInput.defaultProps = {
  defaultCountry: "sa",
  enableSearch: true,
};
