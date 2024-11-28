import React from "react";
import { useEffect } from "react";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import { getAllTeams } from "../../network/apis/team";
import { useState } from "react";
import { Table } from "reactstrap";


const TeamTable = () => {
  const [expandedRows, setExpandedRows] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getAllTeams()
      .then((response) => {
        setTeams(response || []); // Set fetched data
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const itemsPerPage = 6;
  const paginatedTeams = teams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleExpand = (teamId) => {
    setExpandedRows((prev) => (prev === teamId ? null : teamId));
  };

  const renderTeamRow = (team, index) => (
    <>
      <td>{team.name}</td>
      <td>{team.description}</td>
      <td>
        <div className="d-flex align-items-center">
          <ChevronDown
            className={`pointer mx-1 ${
              expandedRows === index ? "rotate-icon" : ""
            }`}
            size={16}
            onClick={() => toggleExpand(index)}
          />
        </div>
      </td>
    </>
  );

  const renderUserRow = (user) => (
    <>
      <td>{user.userName}</td>
      <td>{user.fName}</td>
    </>
  );

  const renderTaskRow = (task) => (
    <>
      <td>{task.taskName}</td>
      <td>{task.description}</td>
    </>
  );

  const renderProjectRow = (project) => (
    <>
      <td>{project.name}</td>
      <td>{project.description}</td>
    </>
  );

  return (
    <div>
      <Table  responsive className="rdt_Table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeams.map((team, index) => (
            <React.Fragment key={index}>
              <tr>{renderTeamRow(team, index)}</tr>
              {expandedRows === index && (
                <>
                  {/* Users Section */}
                  <tr>
                    <td colSpan="3">
                      <h5>Users</h5>
                      <Table  responsive className="nested-table">
                        <thead>
                          <tr>
                            <th>User Name</th>
                            <th>Full Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.users.map((user, idx) => (
                            <tr key={idx}>{renderUserRow(user)}</tr>
                          ))}
                        </tbody>
                      </Table >
                    </td>
                  </tr>

                  {/* Tasks Section */}
                  <tr>
                    <td colSpan="3">
                      <h5>Tasks</h5>
                      <Table  responsive className="nested-table">
                        <thead>
                          <tr>
                            <th>Task Name</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.tasks.map((task, idx) => (
                            <tr key={idx}>{renderTaskRow(task)}</tr>
                          ))}
                        </tbody>
                      </Table >
                    </td>
                  </tr>

                  {/* Project Section */}
                  <tr>
                    <td colSpan="3">
                      <h5>Project</h5>
                      <Table  responsive className="nested-table">
                        <thead>
                          <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>{renderProjectRow(team.oneProject)}</tr>
                        </tbody>
                      </Table >
                    </td>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table >

      {/* Pagination */}
      <div className="table_footer d-flex justify-content-between align-items-center">
        <div>
          Showing {Math.min(currentPage * itemsPerPage, teams.length)} of{" "}
          {teams.length}
        </div>
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          forcePage={currentPage - 1}
          onPageChange={(page) => setCurrentPage(page.selected + 1)}
          pageCount={Math.ceil(teams.length / itemsPerPage)}
          breakLabel={"..."}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName="active"
          containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
        />
      </div>
    </div>
  );
};

export default React.memo(TeamTable);
