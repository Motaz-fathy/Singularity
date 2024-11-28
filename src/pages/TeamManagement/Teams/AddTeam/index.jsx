import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Col, Row } from "reactstrap";
import Input from "../../../../components/Input/Input"; // Adjust the path to where your Input component is located.
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import { AddTeamReq, GetAllProject } from "../../../../network/apis/team";
import Select from "../../../../components/Select/Select"; // Adjust the path to where your Select component is located.

const AddTeam = () => {
  // State to hold project options and selected project
  const [projects, setProjects] = useState([]);

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await GetAllProject(); // API call to fetch projects
        console.log("projects", projectData?.data);

        // Map the fetched project data into the format needed for the Select component
        const projectOptions = projectData?.data?.map((project) => ({
          value: project.id, // Assuming the project has an 'id' field
          label: project.name, // Assuming the project has a 'name' field
        }));

        setProjects(projectOptions); // Set the options in state
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Validation Schema
  const CreateProjectSchema = Yup.object().shape({
    name: Yup.string()
      .required("Team name is required")
      .min(3, "Name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(250, "Description can't exceed 250 characters"),
    project: Yup.object().required("Project is required"), // Validation for project selection
  });

  // Initial Values
  const initialValues = {
    name: "",
    description: "",
    project: null, // Initially no project selected
  };

  const breadCrumbItems = [
    {
      linkLabel: "Add Team",
      isActive: true,
    },
  ];

  // Handle Submit
  const handleSubmit = async (values, { resetForm }) => {
    console.log("values" , values)
    try {
      // Ensure the selected project ID is included in the team data
      const teamData = {
        ...values,
        projectId: values?.project?.value , // projectId from the selected project
      };

      // Call the API with the team data
      const response = await AddTeamReq(teamData);
      console.log("Team created successfully:", response);
      
      resetForm(); // Reset the form after successful submission
      alert("Team created successfully!");
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create team. Please try again.");
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
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

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={CreateProjectSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            {/* Team Name Field */}
            <Field name="name">
              {({ field }) => (
                <>
                  <Input
                    label="Team Name"
                    id="name"
                    type="text"
                    name={field.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter team name"
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
                    placeholder="Enter team description"
                    required
                  />
                  {touched.description && errors.description && (
                    <div className="text-danger mt-1">{errors.description}</div>
                  )}
                </>
              )}
            </Field>

            {/* Project Select Field */}
            <Field name="project">
              {({ field }) => (
                <>
                  <Select
                    label="Select Project"
                    id="project"
                    name={field.name}
                    value={values.project} // This is the selected project value
                    onChange={(selectedOption) => {
                      console.log("selectedOption" , selectedOption)
                      setFieldValue("project", selectedOption); // Update form state with the selected project
                    }}
                    optionsArr={projects} // Project options
                    placeholder="Select a project"
                    required
                    isClearable={false} // Make the project selection mandatory
                  />
                  {touched.project && errors.project && (
                    <div className="text-danger mt-1">{errors.project}</div>
                  )}
                </>
              )}
            </Field>

            {/* Submit Button */}
            <Button type="submit" color="primary" className="mt-3">
              Create Team
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTeam;
