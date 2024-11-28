import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import moment from "moment";
import "moment/locale/ar";
import Avatar from "@components/avatar";
import { IntlContext } from "../../../utility/context/Internationalization";
import { requestProfileInfo } from "../../../redux/thunk/profile";
import "./ViewProfileInfo.scss";

const ViewProfileInfo = () => {
  const {
    first_name,
    last_name,
    full_name,
    picture,
    picture_url,
    last_update,
    email,
    phone,
  } = useSelector((state) => state.profile.viewProfileInfo);
  const dispatch = useDispatch();
  const { messages, locale } = useContext(IntlContext);
  useEffect(() => {
    dispatch(requestProfileInfo());
  }, []);
  const userData = [
    {
      label: messages.PROFILE_PAGE.FIRST_NAME,
      value: first_name,
    },
    {
      label: messages.PROFILE_PAGE.LAST_NAME,
      value: last_name,
    },
    {
      label: messages.PROFILE_PAGE.EMAIL,
      value: email,
    },
    {
      label: messages.PROFILE_PAGE.PHONE,
      value: phone,
    },
    {
      label: messages.PROFILE_PAGE.LAST_UPDATED,
      value: moment(last_update).locale(locale).format("Do MMMM YYYY, h:mm a"),
    },
  ];
  return (
    <div className="view_profile_info_tab">
      <div className="profile_pic mb-3">
        {(full_name || picture_url) && (
          <Avatar
            img={picture_url || undefined}
            imgHeight="80"
            imgWidth="80"
            initials={true}
            content={full_name}
            color="primary"
            contentStyles={{ width: "80px", height: "80px", fontSize: "28px" }}
            className={`view_profile_info_avatar ${
              picture_url ? "img_avatar" : "initials_avatar"
            }`}
          />
        )}
      </div>
      <div className="profile_info">
        <Row>
          {userData.map(({ label, value }, i) => (
            <Col md="6" key={i} className="mb-2">
              <div className="single_info_container">
                <p className="label bold mb-50">{label}</p>
                <p className="value">{value || "-"}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ViewProfileInfo;
