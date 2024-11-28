import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ProjectDetails = ({ projectData }) => {
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    if (projectData) {
      setProjectDetails(projectData);
    }
  }, [projectData]);

  const renderTask = (task) => (
    <Card key={task.id} className="mb-4">
      <CardBody>
        <CardTitle tag="h5">{task.title}</CardTitle>
        <CardText>{task.description}</CardText>
        <CardText><strong>Status:</strong> {task.status}</CardText>
        {task.taskDemoExample && (
          <Button color="link" href={task.taskDemoExample} target="_blank" rel="noopener noreferrer">
            Task Demo Example
          </Button>
        )}
        {task.proofCompeltes && task.proofCompeltes.map((proof) => (
          <CardText key={proof.id}>
            Proof: <a href={proof.demo} target="_blank" rel="noopener noreferrer">View Proof</a>
          </CardText>
        ))}
      </CardBody>
    </Card>
  );

  const renderUser = (user) => (
    <Card key={user.id} className="mb-4">
      <CardBody>
        <CardTitle tag="h5">{user.fName} {user.lName}</CardTitle>
        <CardText>Email: {user.email}</CardText>
        <CardText>Phone: {user.phoneNumber}</CardText>
        {user.tasksCreated && user.tasksCreated.map(renderTask)}
      </CardBody>
    </Card>
  );

  const renderDepartment = (department) => (
    <Col key={department.id} sm="12" md="6" lg="4" className="mb-4">
      <Card>
        <CardBody>
          <CardTitle tag="h4">{department.name}</CardTitle>
          <CardText>{department.description}</CardText>
          <h5>Users:</h5>
          {department.users && department.users.map(renderUser)}
        </CardBody>
      </Card>
    </Col>
  );

  return (
    <Container>
      <h2 className="my-4">Project Details</h2>
      {projectDetails?.departments && (
        <Row>
          {projectDetails.departments.map(renderDepartment)}
        </Row>
      )}
    </Container>
  );
};

export default ProjectDetails;
