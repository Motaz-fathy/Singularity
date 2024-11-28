import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import {
  FormGroup,
  Label,
  Input as ReactstrapInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap"
import { Eye, EyeOff } from "react-feather"
import { IntlContext } from "../../utility/context/Internationalization"

const Input = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  errMsg,
  formGroupClass,
  labelClass,
  inputClass,
  errClass,
  inputGroupClass,
  inputGroupTextClass,
  passToggleIconSize,
  isInputHasErr,
  note,
  onBlur
}) => {
  const [inputVisibility, setInputVisibility] = useState(false)
  const { messages } = useContext(IntlContext)

  const renderIcon = () => {
    const size = passToggleIconSize || 14

    if (inputVisibility === false) {
      return <Eye size={size} />
    } else {
      return <EyeOff size={size} />
    }
  }

  return (
    <>
      {type === "password" ? (
        <FormGroup className={formGroupClass}>
          <Label
            className={`form-label f_size_14 ${labelClass}`}
            for={id || name}
          >
            {`${label} ${required ? "*" : ""}`}
          </Label>
          <InputGroup className={`${inputGroupClass}`}>
            <ReactstrapInput
              type={inputVisibility === false ? "password" : "text"}
              id={id || name}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder || "********"}
              disabled={disabled}
              className={`${inputClass}`}
            />
            <InputGroupAddon
              addonType="append"
              onClick={() => setInputVisibility(!inputVisibility)}
            >
              <InputGroupText className={`pointer ${inputGroupTextClass}`}>
                {renderIcon()}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {isInputHasErr && (
            <p className={`error_text f_size_12 ${errClass}`}>
              {messages.ERRORS[errMsg]}
            </p>
          )}
        </FormGroup>
      ) : (
        <FormGroup className={formGroupClass}>
          <Label
            className={`form-label f_size_14 ${labelClass}`}
            for={id || name}
          >
            {`${label} ${required ? "*" : ""}`}
          </Label>
          {note && <p className="f_size_10 mb-0 p-0">{note}</p>}
          <ReactstrapInput
            type={type}
            id={id || name}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            className={`${inputClass}`}
            autoComplete="false"
          />
          {isInputHasErr && (
            <p className={`error_text f_size_12 ${errClass}`}>
              {messages.ERRORS[errMsg]}
            </p>
          )}
        </FormGroup>
      )}
    </>
  )
}

export default Input

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  errMsg: PropTypes.string,
  formGroupClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  errClass: PropTypes.string,
  inputGroupClass: PropTypes.string,
  inputGroupTextClass: PropTypes.string,
  passToggleIconSize: PropTypes.number,
  isInputHasErr: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

Input.defaultProps = {
  type: "text"
}
