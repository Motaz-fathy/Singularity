import React, { useContext } from "react"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import notAuthImg from "@src/assets/images/pages/not-authorized.svg"
import themeConfig from "../../configs/themeConfig"
import { IntlContext } from "../../utility/context/Internationalization"

import "@styles/base/pages/page-misc.scss"

const NotAuthorized = () => {
  const { messages, locale } = useContext(IntlContext)
  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to={`/${locale}/`}>
        <span className="brand-logo">
          <img src={themeConfig.app.appLogoImage} alt="logo" />
        </span>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{messages.GENERAL.NOT_AUTHORIZED} 🔐</h2>
          <p className="mb-2">
            {messages.GENERAL.NOT_AUTHORIZED_TO_VISIT_PAGE}
          </p>
          <Button.Ripple
            tag={Link}
            to={`/${locale}/login`}
            color="primary"
            className="btn-sm-block mb-1"
          >
            {messages.GENERAL.BACK_TO_LOGIN}
          </Button.Ripple>
          <img
            className="img-fluid"
            src={notAuthImg}
            alt="Not authorized page"
          />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
