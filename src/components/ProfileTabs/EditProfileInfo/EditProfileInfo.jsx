import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col } from "reactstrap";
import Avatar from "../../../@core/components/avatar/index";
import { IntlContext } from "../../../utility/context/Internationalization";
import FileUploader from "../../FileUploader/FileUploader";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import PhoneCountryInput from "../../PhoneCountryInput/PhoneCountryInput";
import {
  editProfileInfoSubmit,
  changeProfilePic,
} from "../../../redux/thunk/profile";
import "./EditProfileInfo.scss";
import { isEmptyObject } from "jquery";

const EditProfileInfo = () => {
  const { messages } = useContext(IntlContext);
  const { full_name, first_name, last_name, picture_url, picture, phone } =
    useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);

  // Split the name of the picture to get the extension
  const defaultPictureNameArr = picture ? picture.split(".") : [];
  // Get the extension for the userdata
  const defaultPictureExtension = picture
    ? defaultPictureNameArr[defaultPictureNameArr.length - 1]
    : "";

  const formInputs = [
    {
      name: "picture",
      label: messages.PROFILE_PAGE.PROFILE_PICTURE,
    },
    {
      name: "first_name",
      label: messages.PROFILE_PAGE.FIRST_NAME,
    },
    {
      name: "last_name",
      label: messages.PROFILE_PAGE.LAST_NAME,
    },
    {
      name: "phone",
      label: messages.PROFILE_PAGE.PHONE,
    },
  ];
  const initialValues = {
    first_name: first_name || "",
    last_name: last_name || "",
    phone: phone
      ? typeof phone !== "string"
        ? phone.toString()
        : phone
      : "966",
    picture: {
      fileName: picture || "",
      fileExtension: picture ? defaultPictureExtension : "",
      file: picture_url || null,
      isSizeValid: true,
      isTypeValid: true,
    },
  };
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("REQUIRED")
      .min(2, "TOO_SHORT")
      .max(50, "MAX_FIRST_NAME_LENGTH_50"),
    last_name: Yup.string()
      .required("REQUIRED")
      .min(2, "TOO_SHORT")
      .max(50, "MAX_LAST_NAME_LENGTH_50"),
    phone: Yup.string(),
    picture: Yup.object()
      .test(
        "file_size",
        "MAXIMUM_PROFILE_PIC_SIZE",
        (value) => value.isSizeValid
      )
      .test("file_type", "ACCEPTED_PIC_FORMATS", (value) => value.isTypeValid),
  });
  const {
    values,
    handleSubmit,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      const defaultPhone =
        phone && typeof phone !== "string" ? phone.toString() : phone;
      if (defaultPhone !== values.phone) {
        !isPhoneEmpty &&
          formData.append("phone", values.phone.replace(/\+|\s/g, ""));
      } else {
        formData.append("phone", values.phone.replace(/\+|\s/g, ""));
      }
      dispatch(editProfileInfoSubmit({ values: formData }));
    },
  });
  const handleSubmitOnEnter = (e) => {
    e.key === "Enter" && handleSubmit();
  };
  useEffect(() => {
    if (isEmptyObject(values)) {
      return;
    } else {
      setIsPhoneEmpty(values.phone.split(" ").length <= 1);
    }
  }, [values.phone]);
  useEffect(() => {
    window.addEventListener("keypress", handleSubmitOnEnter);
    return () => {
      window.removeEventListener("keypress", handleSubmitOnEnter);
    };
  }, []);
  return (
    <div className="edit_profile_info_tab">
      <Form className="edit_profile_form" onSubmit={handleSubmit}>
        <Row>
          {formInputs.map(({ name, label }, i) =>
            name === "phone" ? (
              <Col key={i} lg="6">
                <PhoneCountryInput
                  name={name}
                  value={values[name]}
                  onChange={(formattedValue) => {
                    setFieldTouched(name);
                    setFieldValue(name, formattedValue);
                  }}
                  label={label}
                />
              </Col>
            ) : name === "picture" ? (
              <Col key={i} xs="12">
                <FileUploader
                  label={label}
                  placeholderType="img"
                  emptyImgPlaceholder={
                    <Avatar
                      img={false}
                      imgHeight="80"
                      imgWidth="80"
                      initials={true}
                      content={full_name}
                      color="primary"
                      contentStyles={{
                        width: "80px",
                        height: "80px",
                        fontSize: "28px",
                      }}
                      className="edit_profile_info_avatar"
                    />
                  }
                  allowedFileSize={2}
                  allowedFileTypes={["png", "jpg", "jpeg"]}
                  onUploadFile={(value) => {
                    setFieldTouched(name);
                    setFieldValue(name, value);
                    if (value.file) {
                      let formData = new FormData();
                      formData.append("picture", value.file);
                      dispatch(changeProfilePic(formData));
                    }
                  }}
                  onResetFile={() => {
                    dispatch(changeProfilePic());
                  }}
                  errMsg={errors[name]}
                  isFileHasErr={touched[name] && errors[name]}
                  value={values[name]}
                  required={true}
                  containerClass="edit_profile_pic_uploader"
                  fileUploaderClass="edit_profile_pic_uploader_container mb-3"
                  labelClass="mb-1"
                  isFormData={true}
                  uploadBtnLabel={messages.BUTTONS.UPLOAD}
                  note={messages.PROFILE_PAGE.PICTURE_VALIDATION_MSG}
                />
              </Col>
            ) : (
              <Col key={i} lg="6">
                <Input
                  name={name}
                  label={label}
                  required={true}
                  type="text"
                  onChange={(e) => {
                    setFieldTouched(name);
                    setFieldValue(name, e.target.value);
                  }}
                  value={values[name]}
                  isInputHasErr={touched[name] && errors[name]}
                  errMsg={errors[name]}
                  inputClass={`${
                    touched[name] && errors[name] ? "err_border" : ""
                  }`}
                  inputGroupTextClass={`${
                    touched[name] && errors[name] ? "err_border" : ""
                  }`}
                />
              </Col>
            )
          )}
        </Row>
        <div className="mt-3 actions_btns">
          <Button type="submit" label={messages.BUTTONS.SAVE_CHANGES} />
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

export default EditProfileInfo;
