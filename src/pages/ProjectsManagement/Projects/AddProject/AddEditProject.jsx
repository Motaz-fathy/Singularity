import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Col, Row } from "reactstrap";
import Input from "../../../../components/Input/Input"; // Adjust the path to where your Input component is located.
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import { AddNewProject } from "../../../../network/apis/project"; // Ensure this is correctly imported

// Validation Schema
const CreateProjectSchema = Yup.object().shape({
  name: Yup.string()
    .required("Project name is required")
    .min(3, "Name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(250, "Description can't exceed 250 characters"),
});

// Initial Values
const initialValues = {
  name: "",
  description: "",
};

const breadCrumbItems = [
  {
    linkLabel: "Add project ",
    isActive: true,
  },
];

const AddEditProject = () => {
  const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
    try {
      console.log("Form Submitted", values);
      // Call the API to add the project
      const response = await AddNewProject(values);

      // Handle the response (you can display a success message or redirect to another page)
      console.log("Project created successfully:", response);

      // Reset form after successful submission
      resetForm();
    } catch (error) {
      // Handle error (you can display an error message)
      console.error("Error creating project:", error);
      setErrors({ submit: "Failed to create project. Please try again." });
    } finally {
      // Ensure the form is not in submitting state anymore
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Row md={12} className={"d-flex justify-between align-items-center "}>
        <Col md={9}>
          <BreadCrumb
            breadCrumbTitle={"Project"}
            showBreadCrumb={true}
            breadCrumbItems={breadCrumbItems}
            breadCrumbClass={"bread_crumbs"}
          />
        </Col>
      </Row>

      <Formik
        initialValues={initialValues}
        validationSchema={CreateProjectSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            {/* Name Field */}
            <Field name="name">
              {({ field }) => (
                <>
                  <Input
                    label="Project Name"
                    id="name"
                    type="text"
                    name={field.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter project name"
                    required
                  />
                  {touched.name && errors.name && (
                    <div className="text-danger mt-1">{errors.name}</div>
                  )}
                </>
              )}
            </Field>

            {/* Description Field */}
            <Field name="description">
              {({ field }) => (
                <>
                  <Input
                    label="Description"
                    id="description"
                    type="textarea"
                    name={field.name}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter project description"
                    required
                  />
                  {touched.description && errors.description && (
                    <div className="text-danger mt-1">{errors.description}</div>
                  )}
                </>
              )}
            </Field>

            {/* Submit Button */}
            <Button type="submit" color="primary" className="mt-3" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>

            {/* Show error message if form submission failed */}
            {errors.submit && (
              <div className="text-danger mt-3">{errors.submit}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditProject;
