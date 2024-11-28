import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col } from "reactstrap";
import { IntlContext } from "../../../utility/context/Internationalization";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import { changeEmailSubmit } from "../../../redux/thunk/profile";
import "../EditProfileInfo/EditProfileInfo.scss";

const ChangeEmail = () => {
  const { messages } = useContext(IntlContext);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    resetForm,
  } = useFormik({
    initialValues: {
      email,
      new_email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("INVALID_EMAIL").required("REQUIRED"),
      new_email: Yup.string().email("INVALID_EMAIL").required("REQUIRED"),
      password: Yup.string().required("REQUIRED"),
    }),
    onSubmit: (values) => {
      dispatch(changeEmailSubmit({ values, resetForm }));
      setIsModalOpen(false);
    },
  });

  const formInputs = [
    {
      label: messages.PROFILE_PAGE.CURRENT_EMAIL,
      name: "email",
      type: "email",
      placeholder: "example@example.com",
      disabled: true,
      required: false,
    },
    {
      label: messages.PROFILE_PAGE.NEW_EMAIL,
      name: "new_email",
      type: "email",
      placeholder: "example@example.com",
      disabled: false,
      required: true,
    },
    {
      label: messages.GENERAL.PASSWORD,
      name: "password",
      type: "password",
      placeholder: "********",
      disabled: false,
      required: true,
    },
  ];

  return (
    <div className="change_email_info_tab">
      <Form onSubmit={handleSubmit} className="change_email_form">
        {formInputs.map(
          ({ label, name, type, placeholder, disabled, required }, i) =>
            type === "email" ? (
              <Row key={i}>
                <Col lg="6">
                  <Input
                    label={label}
                    name={name}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    required={required}
                    onChange={(e) => {
                      setFieldTouched(name);
                      setFieldValue(name, e.target.value);
                    }}
                    value={values[name]}
                    errMsg={errors[name]}
                    isInputHasErr={touched[name] && errors[name]}
                    inputClass={`${
                      touched[name] && errors[name] ? "err_border" : ""
                    }`}
                    inputGroupTextClass={`${
                      touched[name] && errors[name] ? "err_border" : ""
                    }`}
                    formGroupClass="email_form_group"
                  />
                </Col>
              </Row>
            ) : (
              isModalOpen && (
                <Modal
                  isOpen={isModalOpen}
                  title={messages.PROFILE_PAGE.ENTER_PASSWORD_MODAL_TITLE}
                  content={
                    <Input
                      label={label}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      disabled={disabled}
                      required={required}
                      onChange={(e) => {
                        setFieldTouched(name);
                        setFieldValue(name, e.target.value);
                      }}
                      value={values[name]}
                      errMsg={errors[name]}
                      isInputHasErr={touched[name] && errors[name]}
                      inputClass={`${
                        touched[name] && errors[name] ? "err_border" : ""
                      }`}
                      inputGroupTextClass={`${
                        touched[name] && errors[name] ? "err_border" : ""
                      }`}
                    />
                  }
                  confirmBtnTxt={messages.BUTTONS.SAVE}
                  cancelBtnTxt={messages.BUTTONS.CANCEL}
                  onCancel={() => {
                    setIsModalOpen(false);
                    setFieldValue("password", "");
                    delete errors.password;
                    delete touched.password;
                  }}
                  onConfirm={handleSubmit}
                  key={i}
                />
              )
            )
        )}
      </Form>
      <div className="mt-3 actions_btns">
        <Button
          label={messages.BUTTONS.SAVE_CHANGES}
          onClick={() => {
            setIsModalOpen(errors.new_email ? false : true);
          }}
        />
        <Button
          label={messages.BUTTONS.CANCEL}
          outline={true}
          color="secondary"
          className="mx-1"
          onClick={() => resetForm()}
        />
      </div>
    </div>
  );
};

export default ChangeEmail;
