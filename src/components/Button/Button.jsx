import React from "react"
import PropTypes from "prop-types"
import { Button as ReactstrapButton } from "reactstrap"

const Button = ({
  label,
  type,
  color,
  id,
  block,
  onClick,
  disabled,
  className,
  outline,
  active
}) => {
  return (
    <ReactstrapButton
      type={type}
      color={color}
      id={id}
      block={block}
      onClick={onClick}
      disabled={disabled}
      className={className}
      outline={outline}
      active={active}
      
    >
      {label}
    </ReactstrapButton>
  )
}

export default Button

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  block: PropTypes.bool,
  onclick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  className: PropTypes.string,
  active: PropTypes.bool,
}

Button.defaultProps = {
  type: "button",
  color: "primary"
}
