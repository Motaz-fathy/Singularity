import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Col, Row, Button, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import Input from "../../../../components/Input/Input";
import PhoneCountryInput from "../../../../components/PhoneCountryInput/PhoneCountryInput";
import './index.scss';
import { createNewMember } from "../../../../network/apis/team";



const CreateMember = () => {
  const history = useHistory();

  // State to handle loading, success and error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    userName: Yup.string().required("UserName is required").min(4, "UserName must be at least 4 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required").min(10, "Phone number is too short"),
    fName: Yup.string().required("First name is required"),
    lName: Yup.string().required("Last name is required"),
    birthDate: Yup.date().required("Birth date is required").nullable(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain letters")
      .matches(/[0-9]/, "Password must contain numbers")
      .matches(/[^a-zA-Z0-9]/, "Password must contain special characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  // Submit handler
  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      // Set loading state to true
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      // Prepare the data to send to the API
      const memberData = {
        userName: values.userName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        fName: values.fName,
        lName: values.lName,
        birthDate: values.birthDate,
        password: values.password,
        confirmPassword: values.confirmPassword,
        projectId: "someProjectId", // Adjust as needed
      };

      // Call the API to create the new member
      const response = await createNewMember(memberData);

      // Handle success response
      setSuccessMessage("Member created successfully!");
      console.log("API Response:", response);

      // Redirect to teams page after success
      history.push("/teams");
    } catch (error) {
      // Handle error response
      setErrorMessage("Failed to create member. Please try again.");
      console.error("Error during API request:", error);
    } finally {
      // Set loading state to false once the API request is complete
      setIsSubmitting(false);
    }
  };

  const breadCrumbItems = [
    {
      linkLabel: "Create New Member",
      isActive: true,
    },
  ];

  return (
    <div>
      <Row md={12} className={"d-flex justify-between align-items-center "}>
        <Col md={9}>
          <BreadCrumb
            breadCrumbTitle={"Teams"}
            showBreadCrumb={true}
            breadCrumbItems={breadCrumbItems}
            breadCrumbClass={"bread_crumbs"}
          />
        </Col>
      </Row>

      <Formik
        initialValues={{
          userName: "",
          email: "",
          phoneNumber: "",
          fName: "",
          lName: "",
          birthDate: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Row>
              <Col md={6}>
                <Input
                  label="UserName"
                  name="userName"
                  value={values.userName}
                  onChange={(e) => setFieldValue("userName", e.target.value)}
                  placeholder="Enter username"
                  isInputHasErr={touched.userName && errors.userName}
                  errMsg={errors.userName}
                />
                {touched.userName && errors.userName && (
                  <div className="error-message">{errors.userName}</div>
                )}
              </Col>
              <Col md={6}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  placeholder="Enter email"
                  isInputHasErr={touched.email && errors.email}
                  errMsg={errors.email}
                />
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <PhoneCountryInput
                  label="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(value) => setFieldValue("phoneNumber", value)}
                  placeholder="Enter phone number"
                  isInputHasErr={touched.phoneNumber && errors.phoneNumber}
                  errMsg={errors.phoneNumber}
                  defaultCountry="eg"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="error-message">{errors.phoneNumber}</div>
                )}
              </Col>
              <Col md={6}>
                <Input
                  label="First Name"
                  name="fName"
                  value={values.fName}
                  onChange={(e) => setFieldValue("fName", e.target.value)}
                  placeholder="Enter first name"
                  isInputHasErr={touched.fName && errors.fName}
                  errMsg={errors.fName}
                />
                {touched.fName && errors.fName && (
                  <div className="error-message">{errors.fName}</div>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Input
                  label="Last Name"
                  name="lName"
                  value={values.lName}
                  onChange={(e) => setFieldValue("lName", e.target.value)}
                  placeholder="Enter last name"
                  isInputHasErr={touched.lName && errors.lName}
                  errMsg={errors.lName}
                />
                {touched.lName && errors.lName && (
                  <div className="error-message">{errors.lName}</div>
                )}
              </Col>
              <Col md={6}>
                <Input
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={values.birthDate}
                  onChange={(e) => setFieldValue("birthDate", e.target.value)}
                  isInputHasErr={touched.birthDate && errors.birthDate}
                  errMsg={errors.birthDate}
                />
                {touched.birthDate && errors.birthDate && (
                  <div className="error-message">{errors.birthDate}</div>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  placeholder="Enter password"
                  isInputHasErr={touched.password && errors.password}
                  errMsg={errors.password}
                />
                {touched.password && errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </Col>
              <Col md={6}>
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                  isInputHasErr={touched.confirmPassword && errors.confirmPassword}
                  errMsg={errors.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </Col>
            </Row>

            {/* Error and Success Messages */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Submit Button */}
            <div className="mt-3">
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" /> : "Create Member"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMember;
