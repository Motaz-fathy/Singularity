import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";
import { User, Edit, Mail, Lock } from "react-feather";
import Tabs from "../../components/Tabs/Tabs";
import { IntlContext } from "../../utility/context/Internationalization";
import ViewProfileInfo from "../../components/ProfileTabs/ViewProfileInfo/ViewProfileInfo";
import EditProfileInfo from "../../components/ProfileTabs/EditProfileInfo/EditProfileInfo";
import ChangeEmail from "../../components/ProfileTabs/ChangeEmail/ChangeEmail";
import ChangePassword from "../../components/ProfileTabs/ChangePassword/ChangePassword";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { confirmEmailChangeRequest } from "../../redux/thunk/profile";

const Profile = () => {
  const { messages } = useContext(IntlContext);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("profileTab") &&
      localStorage.getItem("profileTab") !== "null"
      ? localStorage.getItem("profileTab")
      : "1"
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams("token");
  useEffect(() => {
    localStorage.setItem("profileTab", activeTab);
  }, [activeTab]);
  useEffect(() => {
    if (token) {
      dispatch(
        confirmEmailChangeRequest({ token: token.split("=")[1], history })
      );
    }
  }, [token]);
  const tabsArr = [
    {
      id: "1",
      title: messages.PROFILE_PAGE.VIEW_PROFILE_INFO,
      icon: <User size={16} />,
    },
    {
      id: "2",
      title: messages.PROFILE_PAGE.EDIT_PROFILE_INFO,
      icon: <Edit size={16} />,
    },
    {
      id: "3",
      title: messages.PROFILE_PAGE.CHANGE_EMAIL,
      icon: <Mail size={16} />,
    },
    {
      id: "4",
      title: messages.PROFILE_PAGE.CHANGE_PASSWORD,
      icon: <Lock size={16} />,
    },
  ];
  const tabsContentArr = [
    {
      id: "1",
      content: <ViewProfileInfo />,
    },
    {
      id: "2",
      content: <EditProfileInfo />,
    },
    {
      id: "3",
      content: <ChangeEmail />,
    },
    {
      id: "4",
      content: <ChangePassword />,
    },
  ];

  return (
    <div className="profile_page">
      <BreadCrumb breadCrumbTitle={messages.PROFILE_PAGE.PROFILE} />
      <Row>
        <Col className="mb-2 mb-md-0" md="3">
          <Tabs
            tabsArr={tabsArr}
            activeTab={activeTab}
            toggleTab={(tab) => setActiveTab(tab)}
          />
        </Col>
        <Col md="9">
          <Card>
            <CardBody>
              <TabContent>
                {tabsContentArr.map(
                  (tab, i) =>
                    activeTab === tab.id && (
                      <TabPane tabId={tab.id} key={i}>
                        {tab.content}
                      </TabPane>
                    )
                )}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
