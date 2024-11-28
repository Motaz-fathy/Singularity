import axios from "axios";

export const GetAllProject = async () => {
    try {
      // Get the token from localStorage
      const token = window.localStorage.getItem("token");
  
      // Check if the token exists
      if (!token) {
        throw new Error("No token found in localStorage.");
      }
  
      // Set up the headers with the Authorization token
      const headers = {
        "Authorization": `Bearer ${token}`, // Assuming the API expects Bearer token for authorization
      };
  
      // Make the GET request with the token in the headers
      const response = await axios.get("https://zyan.tech/dashboard/api/projects", { headers });
  
      // Log the response data
      console.log("Projects data:", response);
  
      return response?.data; // Return the response data
  
    } catch (error) {
      // Log the error and rethrow it
      console.error("Error fetching projects:", error);
      throw error;
    }
  };



  export const AddNewProject = async (projectData) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token"); // Adjust the key name based on your token storage
      
      // Check if token exists, otherwise throw an error
      if (!token) {
        throw new Error("Authentication token is missing");
      }
  
      // Prepare the data to send in the request
      const data = {
        name: projectData.name,
        description: projectData.description,
      };
  
      // Send the request with the token in the Authorization header
      const response = await axios.post(
        "https://zyan.tech/dashboard/api/projects",
        data, // Send the data as JSON
        {
          headers: {
            "Content-Type": "application/json", // Set content type
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
  
      console.log("Data successfully sent:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during AddProject request:", error.response?.data || error);
      throw error;
    }
  };
  

  export const ViewProjectById = async (id) => {

    try {

      const token = localStorage.getItem("token"); // Adjust the key name based on your token storage
      
      // Check if token exists, otherwise throw an error
      if (!token) {
        throw new Error("Authentication token is missing");
      }

       // Set up the headers with the Authorization token
       const headers = {
        "Authorization": `Bearer ${token}`, // Assuming the API expects Bearer token for authorization
      };

       // Make the GET request with the token in the headers
       const response = await axios.get(`https://zyan.tech/dashboard/api/projects/${id}`, { headers });
         console.log("res" , response)
       return response?.data; // Return the response data
      
    } catch (error) {

        // Log the error and rethrow it
        console.error("Error fetching projects:", error);
        throw error;
      
    }
  }