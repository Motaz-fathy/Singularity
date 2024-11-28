import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Table as ReactstrapTable } from "reactstrap";
import { ChevronDown, Eye, Trash } from "react-feather";
import { GetAllProject } from "../../network/apis/project"; // Ensure this is correctly imported
import { useHistory } from "react-router-dom"; 
import { IntlContext } from "../../utility/context/Internationalization";
const ProjectTeamTable = ({ totalRecords = 4 }) => {
  const [expandedRows, setExpandedRows] = useState(null); // Store the expanded project ID
  const [expandedTeams, setExpandedTeams] = useState({}); // Store the expanded team IDs
  const [projects, setProjects] = useState([]); // Store projects in state
  const { locale } = useContext(IntlContext);

  const history = useHistory()
  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await GetAllProject();
        console.log("projectData" , projectData?.data); // Ensure this logs the correct response from the API
        const data = projectData?.data
        if (Array.isArray(data)) {
          setProjects(data); // Set only if it's an array
        } else {
          console.error("Invalid response data:", projectData);
          setProjects([]); // Default to empty array if data is invalid
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); // Ensure the projects state is always an array
      }
    };

    fetchProjects();
  }, []);

  const toggleExpand = (projectId) => {
    setExpandedRows((prev) => (prev === projectId ? null : projectId));
  };

  const toggleTeamExpand = (teamId) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId], // Toggle the expanded state for this team
    }));
  };

  const renderProjectRow = (project) => (
    <>
      <td>{project.name}</td> {/* Display project name */}
      <td>{project.description}</td> {/* Display project description */}
      <td>{project.departments.length}</td> {/* Display the count of departments */}
      <td>
        <div className="d-flex align-items-center">
          <Eye className="pointer mx-1" size={16} 
            onClick={() => {
              history.push({
                pathname: `/${locale}/Projects-Team/view-project/${project.id}`,
                state: { projectId: project.id }  // Pass the project ID as state
              });
            }}
          />
          <Trash className="pointer mx-1" size={16} />
          <ChevronDown
            className={`pointer mx-1 ${expandedRows === project.id ? "rotate-icon" : ""}`}
            size={16}
            onClick={() => toggleExpand(project.id)}
          />
        </div>
      </td>
    </>
  );

  const renderDepartmentRow = (department) => (
    <tr>
      <td>{department.name}</td> {/* Display department name */}
    </tr>
  );

  return (
    <div>
      <ReactstrapTable responsive className="rdt_Table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Departments Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <React.Fragment key={project.id}>
              <tr>{renderProjectRow(project)}</tr>
              {expandedRows === project.id && (
                <tr>
                  <td colSpan="5">
                    <ReactstrapTable responsive className="nested-table">
                      <thead>
                        <tr>
                          <th>Department Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.departments.map((department) =>
                          renderDepartmentRow(department)
                        )}
                      </tbody>
                    </ReactstrapTable>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          
        </tbody>
      </ReactstrapTable>
    </div>
  );
};

export default React.memo(ProjectTeamTable);

ProjectTeamTable.propTypes = {
  totalRecords: PropTypes.number,
};
