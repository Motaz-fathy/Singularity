import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import Table from '../../Table/Table'
import { ChevronDown, Eye, Trash } from "react-feather";
import { IntlContext } from "../../../utility/context/Internationalization";
import { useHistory } from "react-router-dom";

const TaskTable = () => {

    const history = useHistory();
    const { locale } = useContext(IntlContext);

    const [tasks, setTasks] = useState([
        {
          task_id: 1,
          title: "Task One",
          StartDate: "2023-11-01",
          EndDate: "2023-11-05",
          AppUserId: "User1",
          DepartmentId: "Dept1",
          status: "approval",
          timeline: [
            {
              member_name: "Motaz",
              feedback: "I am working now.",
              time: "08:30 AM"
            },
            {
              member_name: "Ahmed",
              feedback: "Comment to Motaz.",
              time: "08:35 AM"
            }
          ],
          attachments: [
            {
              type: "image",
              url: "https://img.freepik.com/premium-photo/trees-growing-forest_1048944-30368869.jpg?w=740",
              description: "Screenshot of the task progress"
            },
            {
              type: "video",
              url: "https://example.com/video1.mp4",
              description: "Video showing progress"
            },
            {
              type: "link",
              url: "https://example.com/document1",
              description: "Link to task documentation"
            }
          ]
        },
        {
          task_id: 2,
          title: "Task Two",
          StartDate: "2023-11-06",
          EndDate: "2023-11-10",
          AppUserId: "User2",
          DepartmentId: "Dept2",
          status: "pending",
          attachments: [
            {
              type: "image",
              url: "https://example.com/image2.jpg",
              description: "Image showing the design draft"
            },
            {
              type: "link",
              url: "https://example.com/feedback",
              description: "Link to feedback form"
            }
          ]
        }
        // Add more tasks as needed
      ]);
      

  // Define columns, including an "Actions" column
  const columns = [
    "Task ID",
    "Title",
    "Start Date",
    "End Date",
    "User ID",
    "Department ID",
    "Actions", // New column for actions
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = tasks.length;

  // Handle View Action
  const handleView = (task) => {
    console.log("View Task", task);
    // Implement view logic (e.g., navigate to task details page or open modal)
  };

  // Handle Delete Action
  const handleDelete = (task_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.task_id !== task_id));
    }
  };

  // Render rows
  const renderRow = (task) => (
    <>
      <td>{task.task_id}</td>
      <td>{task.title}</td>
      <td>{task.StartDate}</td>
      <td>{task.EndDate}</td>
      <td>{task.AppUserId}</td>
      <td>{task.DepartmentId}</td>
      <td>
        <div className="d-flex align-items-center">
          <Eye
            className="pointer mx-1"
            size={16}
            onClick={() => {
              // Send team object in state when navigating
              history.push({
                pathname: `/${locale}/Tasks/view-task/${task.task_id}`,
                state: { task }, // Pass the entire team object here
              });
            }}
          />
          <Trash className="pointer mx-1" size={16} />
         
        </div>
      </td>
    </>
  );

  // Paginate data (assuming 10 items per page)
  const paginatedData = tasks?.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="task-table">
      <Table
        columns={columns}
        data={paginatedData}
        renderRow={renderRow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecords={totalRecords}
      />
    </div>
  );
};

export default TaskTable;
