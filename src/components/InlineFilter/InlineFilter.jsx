import React from "react"
import "./styles.scss"
function InlineFilter({ isActive = false, title, count }) {
  return (
    <div className={`filter-contain ${isActive ? "active" : ""}`}>
      <span className="title">{title}</span>
      <span className="count">{count}</span>
    </div>
  )
}

export default InlineFilter
