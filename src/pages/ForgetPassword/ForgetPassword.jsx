import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CardTitle, CardText, Form } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronLeft, ChevronRight } from "react-feather";
import { IntlContext } from "../../utility/context/Internationalization";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SystemAccessDesign from "../../components/SystemAccessDesign/SystemAccessDesign";
import { forgetPasswordResetLinkRequest } from "../../redux/thunk/auth";
import "@styles/base/pages/page-auth.scss";

const ForgetPassword = () => {
  const { messages, locale } = useContext(IntlContext);
  const dispatch = useDispatch();

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
    },
    validationSchema: Yup.object({
      email: Yup.string().email("INVALID_EMAIL").required("REQUIRED"),
    }),
    onSubmit: (values) => {
      dispatch(forgetPasswordResetLinkRequest(values));
    },
  });

  useEffect(() => {
    if (values.email !== "" && errors.email === "REQUIRED") {
      delete errors.email;
    }
  }, [errors]);

  const renderContent = () => {
    return (
      <>
        <CardTitle tag="h2" className="font-weight-bold mb-1">
          {messages.FORGOT_PASSWORD_PAGE.FORGOT_PASSWORD_TITLE} 🔒
        </CardTitle>
        <CardText className="mb-2">
          {messages.FORGOT_PASSWORD_PAGE.OPENING_MSG}
        </CardText>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
          <Input
            label={messages.GENERAL.EMAIL}
            name="email"
            type="email"
            placeholder="example@example.com"
            required={true}
            onChange={(e) => {
              setFieldTouched("email");
              setFieldValue("email", e.target.value);
            }}
            value={values.email}
            isInputHasErr={touched.email && errors.email}
            errMsg={errors.email}
            inputClass={`${touched.email && errors.email ? "err_border" : ""}`}
            inputGroupTextClass={`${
              touched.email && errors.email ? "err_border" : ""
            }`}
          />
          <Button
            label={messages.FORGOT_PASSWORD_PAGE.RESET_PASSWORD_BTN}
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

  return <SystemAccessDesign renderContent={renderContent} />;
};

export default ForgetPassword;
