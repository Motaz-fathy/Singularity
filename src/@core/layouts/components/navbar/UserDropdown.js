// ** React Imports
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"
import { User } from "react-feather"
import Logout from "../../../../components/Logout/Logout"
import Modal from "../../../../components/Modal/Modal"
import { IntlContext } from "../../../../utility/context/Internationalization"
import { logoutRequest } from "../../../../redux/thunk/auth"

const UserDropdown = () => {
  // ** Store Vars
  const userData = useSelector(state => state.auth.userData)
  const { messages, locale } = useContext(IntlContext)
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  //** Vars
  const userName = `${userData.name}`
  const userAvatar = (userData && userData.picture_url) || undefined
  const handleRouteToProfile = () => {
    history.push(`/${locale}/profile`)
    window.location.reload()
  }
  const handleLogout = () => {
    dispatch(logoutRequest(history))
    setIsModalOpen(false)
  }
  return (
    <>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={e => e.preventDefault()}
        >
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name font-weight-bold">{userName === undefined? "user" : userName}</span>
          </div>
          <Avatar
            img={userAvatar}
            imgHeight="40"
            imgWidth="40"
            initials={true}
            content={userName === undefined? "user" : userName}
            color="primary"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={handleRouteToProfile}>
            <div className="user_profile_container">
              <User size={14} className="mr-75" />
              <span className="align-middle">
                {messages.PROFILE_PAGE.PROFILE}
              </span>
            </div>
          </DropdownItem>
          <DropdownItem>
            <Logout onLogout={() => setIsModalOpen(true)} />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={messages.LOGOUT.LOGOUT}
          content={messages.LOGOUT.MODAL_BODY}
          onConfirm={handleLogout}
          onCancel={() => setIsModalOpen(false)}
          confirmBtnTxt={messages.BUTTONS.YES}
          cancelBtnTxt={messages.BUTTONS.NO}
        />
      )}
    </>
  )
}

export default UserDropdown
