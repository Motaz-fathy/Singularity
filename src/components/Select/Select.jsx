import React, {useContext} from "react"
import PropTypes from "prop-types"
import ReactSelect from "react-select"
import {FormGroup, Label} from "reactstrap"
import {IntlContext} from "../../utility/context/Internationalization"
import {selectThemeColors} from "../../utility/Utils"

const Select = ({
  label,
  id,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  required,
  errMsg,
  formGroupClass,
  labelClass,
  inputClass,
  errClass,
  isInputHasErr,
  note,
  multiple,
  optionsArr,
  isClearable,
  closeMenuOnSelect
}) => {
  const {messages} = useContext(IntlContext)
  const customStyles = {
    container: styles => ({
      ...styles,
      width: "100%"
    }),
    control: (styles, state) => ({
      ...styles,
      boxShadow: "0 !important",
      borderColor:
        state.selectProps.className === "err_border" ? "#be1f1f" : "#d8d6de",
      ":hover": {
        ...styles[":hover"],
        borderColor:
          state.selectProps.className === "err_border" ? "#be1f1f" : "#d8d6de"
      }
    }),
    clearIndicator: styles => ({
      ...styles,
      cursor: "pointer"
    }),
    indicatorSeparator: styles => ({
      ...styles,
      display: "none"
    }),
    option: (styles, {isDisabled, isFocused, isSelected}) => ({
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "rgba(109, 74, 172, 1)"
        : isFocused
        ? "rgba(138, 35, 119, 0.1)"
        : null,
      color: isDisabled ? "#b9b9c3" : isSelected ? "#fff" : "#6e6b7b",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled &&
          (isSelected ? "rgba(109, 74, 172, 1)" : "rgba(138, 35, 119, 0.1)")
      }
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: "rgba(109, 74, 172, 1)",
      borderRadius: "5px"
    }),
    multiValueLabel: styles => ({
      ...styles,
      color: "#fff"
    }),
    multiValueRemove: styles => ({
      ...styles,
      color: "#fff",
      ":hover": {
        ...styles[":hover"],
        color: "#fff",
        backgroundColor: "rgba(109, 74, 172, 1)",
        cursor: "pointer",
        borderRadius: "5px"
      }
    })
  }
  return (
    <>
      <FormGroup className={formGroupClass}>
        <Label
          className={`form-label f_size_12 ${labelClass}`}
          for={id || name}
        >
          {`${label} ${required ? "*" : ""}`}
        </Label>
        {note && <p className="f_size_10 mb-0 p-0">{note}</p>}
        <ReactSelect
          name={name}
          id={id || name}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          isDisabled={disabled}
          className={`${inputClass}`}
          isClearable={isClearable}
          options={optionsArr}
          isMulti={multiple}
          closeMenuOnSelect={closeMenuOnSelect}
          styles={customStyles}
          theme={selectThemeColors}
        />
        {isInputHasErr && (
          <p className={`error_text f_size_12 ${errClass}`}>
            {messages.ERRORS[errMsg]}
          </p>
        )}
      </FormGroup>
    </>
  )
}

export default Select
Select.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  optionsArr: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ).isRequired,
  value: PropTypes.any.isRequired,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  errMsg: PropTypes.string,
  formGroupClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  errClass: PropTypes.string,
  isInputHasErr: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  multiple: PropTypes.bool,
  isClearable: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool
}
