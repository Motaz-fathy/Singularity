import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { ViewProjectById } from '../../../../network/apis/project'; // Assuming the API function is correctly imported
import ProjectDetails from './ProjectDetails';

const ViewProject = () => {
  const { projectId } = useParams(); // Get the projectId from the URL
  const location = useLocation(); // Get the location object to access state passed through history.push
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Access the projectId from the state passed via history.push
    const idFromState = location?.state?.projectId;
    
    // Use projectId from URL if it's not available in state
    const id = idFromState || projectId;
    // Fetch the project details using the ID
    if (id) {
      setLoading(true); // Set loading to true before API call
      setError(null); // Reset any previous error

      ViewProjectById(id)
        .then(data => {
          setProjectDetails(data); // Set project details in state
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch(err => {
          console.error("Error fetching project:", err);
          setError("Failed to fetch project details.");
          setLoading(false); // Set loading to false if there's an error
        });
    }
  }, [location, projectId]);



  return (
    <div>
      {loading ? (
        <div>Loading...</div> // Display loading message while fetching
      ) : error ? (
        <div className="text-danger">{error}</div> // Display error message if there's an error
      ) : !projectDetails ? (
        <div>No project details available.</div> // Fallback in case no details are returned
      ) : (
        <ProjectDetails projectData={projectDetails} /> // Render ProjectDetails when data is available
      )}
    </div>
  );
};

export default ViewProject;
