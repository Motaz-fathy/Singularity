import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { CardTitle, CardText, Form } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronLeft, ChevronRight } from "react-feather";
import { IntlContext } from "../../utility/context/Internationalization";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SystemAccessDesign from "../../components/SystemAccessDesign/SystemAccessDesign";
import PasswordRules from "../../components/PasswordRules/PasswordRules";
import { resetPasswordRequest } from "../../redux/thunk/auth";
import "@styles/base/pages/page-auth.scss";

const ResetPassword = (props) => {
  const { messages, locale } = useContext(IntlContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams("token");

  const {
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("INVALID_EMAIL").required("REQUIRED"),
      password: Yup.string()
        .required("REQUIRED")
        .min(8, "TOO_SHORT")
        .max(50, "MAX_PASSWORD_LENGTH_50")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
          "INVALID_PASSWORD"
        ),
      confirmPassword: Yup.string()
        .required("REQUIRED")
        .oneOf([Yup.ref("password")], "CONFIRM_PASSWORD_MATCH_PASSWORD"),
    }),
    onSubmit: ({ email, password, confirmPassword }) => {
      dispatch(
        resetPasswordRequest({
          values: {
            email,
            password,
            password_confirmation: confirmPassword,
            token,
          },
          history,
        })
      );
    },
  });

  const formInputs = [
    {
      label: messages.GENERAL.EMAIL,
      name: "email",
      type: "email",
      placeholder: "example@example.com",
    },
    {
      label: messages.RESET_PASSWORD_PAGE.NEW_PASSWORD,
      name: "password",
      type: "password",
      placeholder: "********",
    },
    {
      label: messages.RESET_PASSWORD_PAGE.CONFIRM_PASSWORD,
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
    },
  ];
  const renderContent = () => {
    return (
      <>
        <CardTitle tag="h2" className="font-weight-bold mb-1">
          {messages.RESET_PASSWORD_PAGE.RESET_PASSWORD_TITLE} 🔒
        </CardTitle>
        <CardText className="mb-2">
          {messages.RESET_PASSWORD_PAGE.OPENING_MSG}
        </CardText>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
          {formInputs.map(({ label, name, type, placeholder }, i) => (
            <Input
              label={label}
              name={name}
              type={type}
              placeholder={placeholder}
              required={true}
              onChange={(e) => {
                setFieldTouched(name);
                setFieldValue(name, e.target.value.trim());
              }}
              value={values[name]}
              isInputHasErr={touched[name] && errors[name]}
              errMsg={errors[name]}
              key={i}
              inputClass={`${
                touched[name] && errors[name] ? "err_border" : ""
              }`}
              inputGroupTextClass={`${
                touched[name] && errors[name] ? "err_border" : ""
              }`}
            />
          ))}
          <PasswordRules />
          <Button
            label={messages.RESET_PASSWORD_PAGE.SET_NEW_PASSWORD}
            block={true}
            type="submit"
            className="mt-4 mb-1"
          />
        </Form>
        <p className="text-center mt-2">
          <Link to={`/${locale}/login`}>
            {locale === "en" ? (
              <ChevronLeft className="mr-25" size={14} />
            ) : (
              <ChevronRight className="mr-25" size={14} />
            )}
            <span className="align-middle">
              {messages.FORGOT_PASSWORD_PAGE.BACK_TO_LOGIN}
            </span>
          </Link>
        </p>
      </>
    );
  };

  return (
    <div className="reset_password_page">
      <SystemAccessDesign renderContent={renderContent} />
    </div>
  );
};

export default ResetPassword;
