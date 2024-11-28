import React, { useContext, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { CardTitle, CardText, Form } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IntlContext } from "../../utility/context/Internationalization";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import SystemAccessDesign from "../../components/SystemAccessDesign/SystemAccessDesign";
import { loginRequest } from "../../network/apis/auth";
import "@styles/base/pages/page-auth.scss";

const Login = () => {
  const { messages, locale } = useContext(IntlContext);
  const history = useHistory();
  const { token } = useParams("token");

  useEffect(() => {
    // Handle token-based operations if required
  }, [token]);

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
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("INVALID_EMAIL").required("REQUIRED"),
      password: Yup.string().required("REQUIRED"),
    }),
    onSubmit: async (values) => {
      console.log("Form values submitted:", values);
      try {
        const response = await loginRequest({
          email: values.email,
          password: values.password,
        });
        console.log("Login successful:", response);
        // Handle successful login (e.g., save token, redirect user)
        history.push(`/${locale}/home`); // Redirect after successful login
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login error (e.g., show an error message)
      }
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
      label: messages.GENERAL.PASSWORD,
      name: "password",
      type: "password",
      placeholder: "********",
    },
    {
      label: messages.LOGIN_PAGE.REMEMBER_ME,
      name: "rememberMe",
      type: "checkbox",
    },
  ];

  const renderContent = () => {
    return (
      <>
        <CardTitle tag="h2" className="font-weight-bold mb-1">
          {messages.HOME_PAGE.TITLE} 👋
        </CardTitle>
        <CardText className="mb-2">{messages.LOGIN_PAGE.OPENING_MSG}</CardText>
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
          {formInputs.map(({ label, name, type, placeholder }, i) =>
            type === "checkbox" ? (
              <Checkbox
                label={label}
                name={name}
                checked={values[name]}
                key={i}
                onChange={(e) => {
                  setFieldTouched(name);
                  setFieldValue(name, e.target.checked);
                }}
              />
            ) : (
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
            )
          )}
          <Button
            label={messages.LOGIN_PAGE.SIGN_IN}
            block={true}
            type="submit"
            className="mt-4 mb-1"
          />
        </Form>
        <p className="d-flex justify-content-end">
          <Link to={`/${locale}/forget-password`}>
            {messages.LOGIN_PAGE.FORGOT_PASSWORD}
          </Link>
        </p>
      </>
    );
  };

  return <SystemAccessDesign renderContent={renderContent} />;
};

export default Login;
