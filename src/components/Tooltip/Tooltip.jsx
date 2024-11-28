import React, { useState } from "react"
import PropTypes from "prop-types"
import { Tooltip as ReactstrapTooltip } from "reactstrap"

const Tooltip = ({ targetElt, placement, target, content, className }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)
  return (
    <>
      {targetElt}
      <ReactstrapTooltip
        placement={placement}
        target={target}
        isOpen={tooltipOpen}
        toggle={toggle}
        className={className}
      >
        {content}
      </ReactstrapTooltip>
    </>
  )
}

export default Tooltip

Tooltip.propTypes = {
  targetElt: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  target: PropTypes.string.isRequired,
  placement: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
}
Tooltip.defaultProps = {
  placement: "top"
}
