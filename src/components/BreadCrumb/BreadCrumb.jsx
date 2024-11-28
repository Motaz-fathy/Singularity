import React from "react"
import {Link} from "react-router-dom"
import Proptypes from "prop-types"
import {Breadcrumb, BreadcrumbItem} from "reactstrap"
import "./BreadCrumb.scss"

const BreadCrumb = ({
  breadCrumbTitle,
  breadCrumbBtnTitle,
  breadCrumbItems,
  showBreadCrumb,
  breadCrumbClass
}) => {
  return (
    <div
      className={`content-header w-100 row breadcrumb_component ${breadCrumbClass}`}
    >
      <div className="content-header-left col-md-10 col-10 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? (
              <h2
                className={`content-header-title float-left mb-0 ${
                  !showBreadCrumb && "no_border"
                }`}
              >
                {breadCrumbTitle}
              </h2>
            ) : (
              ""
            )}
            {showBreadCrumb && (
              <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
                <Breadcrumb>
                  {breadCrumbItems?.map(({linkLabel, linkTo, isActive}, i) => (
                    <BreadcrumbItem
                      tag="li"
                      key={i}
                      active={isActive}
                      className={`${isActive ? "body_text" : "primary_text"}`}
                    >
                      {linkTo ? (
                        <Link to={linkTo}>{linkLabel}</Link>
                      ) : (
                        linkLabel
                      )}
                    </BreadcrumbItem>
                  ))}
                </Breadcrumb>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreadCrumb
BreadCrumb.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbItems: Proptypes.arrayOf(
    Proptypes.shape({
      linkLabel: Proptypes.string,
      linkTo: Proptypes.string,
      isActive: Proptypes.bool
    })
  ),
  showBreadCrumb: Proptypes.bool,
  breadCrumbClass: Proptypes.string
}
