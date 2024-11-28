import React, {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Col, Form, Row} from "reactstrap";
import {IntlContext} from "../../../utility/context/Internationalization";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import PasswordRules from "../../PasswordRules/PasswordRules";
import {changePasswordSubmit} from "../../../redux/thunk/profile";
import "../EditProfileInfo/EditProfileInfo.scss";

const ChangePassword = () => {
  const { messages } = useContext(IntlContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email } = useSelector((state) => state.auth.userData);
  const {
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,resetForm
  } = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("REQUIRED"),
      password: Yup.string()
        .required("REQUIRED")
        .min(8, "TOO_SHORT")
        .max(50, "MAX_PASSWORD_LENGTH_50")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
          "INVALID_PASSWORD"
        ),
      password_confirmation: Yup.string()
        .required("REQUIRED")
        .oneOf([Yup.ref("password")], "CONFIRM_PASSWORD_MATCH_PASSWORD"),
    }),
    onSubmit: ({ old_password, password, password_confirmation }) => {
      dispatch(
        changePasswordSubmit({
          values: {
            email,
            old_password,
            password,
            password_confirmation,
          },
          history,
        })
      );
    },
  });
  const formInputs = [
    {
      label: messages.PROFILE_PAGE.CURRENT_PASSWORD,
      name: "old_password",
    },
    {
      label: messages.PROFILE_PAGE.NEW_PASSWORD,
      name: "password",
    },
    {
      label: messages.PROFILE_PAGE.CONFIRM_PASSWORD,
      name: "password_confirmation",
    },
  ];
  const renderInput = (name, label, i) => (
    <Input
      label={label}
      name={name}
      type="password"
      placeholder="********"
      required={true}
      onChange={(e) => {
        setFieldTouched(name);
        setFieldValue(name, e.target.value.trim());
      }}
      value={values[name]}
      isInputHasErr={touched[name] && errors[name]}
      errMsg={errors[name]}
      key={i}
      inputClass={`${touched[name] && errors[name] ? "err_border" : ""}`}
      inputGroupTextClass={`${
        touched[name] && errors[name] ? "err_border" : ""
      }`}
    />
  );

  return (
    <div className="change_password_info_tab">
      <Form className="change_password_form" onSubmit={handleSubmit}>
        <Row>
          {formInputs.map(({ label, name }, i) =>
            name === "old_password" ? (
              <Col xs={12} key={i}>
                <Row>
                  <Col lg={6}>{renderInput(name, label, i)}</Col>
                </Row>
              </Col>
            ) : (
              <Col lg={6} key={i}>
                {renderInput(name, label, i)}
              </Col>
            )
          )}
        </Row>
        <PasswordRules />
        <div className="mt-3 actions_btns">
          <Button label={messages.BUTTONS.SAVE_CHANGES} type="submit" />
          <Button
            label={messages.BUTTONS.CANCEL}
            outline={true}
            color="secondary"
            className="mx-1"
            onClick={() => resetForm()}
          />
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
