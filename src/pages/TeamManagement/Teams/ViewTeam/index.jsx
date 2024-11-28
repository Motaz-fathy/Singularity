import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  ListGroup,
  ListGroupItem,
  Table,

} from "reactstrap";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumb from "../../../../components/BreadCrumb/BreadCrumb";
import { useLocation } from 'react-router-dom';
const ViewTeam = () => {
    const location = useLocation(); // Get location object
    const { team } = location.state || {};
  // Function to show toast notifications
  const notify = message => {
    toast.success(message, { position: "top-right" });
  };
  //   breadCrumb
  const breadCrumbItems = [
    {
      linkLabel: "view",
      isActive: true
    }
  ];

  return (
    <div className="container mt-4">
          <BreadCrumb
            breadCrumbTitle={"Teams"}
            showBreadCrumb={true}
            breadCrumbItems={breadCrumbItems}
            breadCrumbClass={"bread_crumbs"}
          />
      <ToastContainer />

      <Card
          key={team.team_id}
          className="mb-4 shadow-sm animate__animated animate__fadeInUp"
        >
          <CardBody>
            <CardTitle tag="h4" className="mb-3">
              {team.team_name}{" "}
              <Badge color="primary">{team.team_department}</Badge>
            </CardTitle>

            {/* Projects Section */}
            <CardText>
              <strong>Projects:</strong>
            </CardText>
            <ListGroup className="mb-3">
              {team.projects.map(project =>
                <ListGroupItem key={project.project_id}>
                  <strong>{project.project_name}</strong> - Deadline:{" "}
                  <Badge color="info">{project.project_deadline}</Badge>
                </ListGroupItem>
              )}
            </ListGroup>

            {/* Members Section */}
            <CardText>
              <strong>Members:</strong>
            </CardText>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Tasks</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map(member =>
                  <tr key={member.member_id}>
                    <td>
                      {member.member_name}
                    </td>
                    <td>
                      {member.member_position}
                    </td>
                    <td>
                      <Badge color="dark">
                        {member.count_task} Tasks
                      </Badge>
                    </td>
                    <td>
                      {member.active
                        ? <Badge color="success">Active</Badge>
                        : <Badge color="secondary">Inactive</Badge>}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Active Tasks Section */}
            <CardText>
              <strong>Active Tasks:</strong>
            </CardText>
            <ListGroup>
              {team.active_tasks.map(task =>
                <ListGroupItem
                  key={task.task_id}
                  onClick={() =>
                    notify(
                      `Task "${task.task_name}" assigned to ${task.assigned_to}`
                    )}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{task.task_name}</strong> - Assigned to:{" "}
                  <Badge color="warning">{task.assigned_to}</Badge>
                </ListGroupItem>
              )}
            </ListGroup>
          </CardBody>
        </Card>
    </div>
  );
};

export default ViewTeam;
