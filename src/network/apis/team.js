import axios from "axios";

export const getAllTeams = async () => {
  try {
    const response = await axios.get('https://zyan.tech/dashboard/api/department/GetAll');
    console.log("data" , response)
    return response?.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

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
  


export const AddTeamReq = async (teamData) => {
    try {
      // Prepare the data as a JSON object (not FormData)
      const data = {
        name: teamData.name,
        description: teamData.description,
        projectId : teamData.projectId
      };
  
      const response = await axios.post(
        "https://zyan.tech/dashboard/api/Department",
        data, // Send the data as JSON
        {
          headers: {
            "Content-Type": "application/json", // Use application/json for the content type
          },
        }
      );
  
      console.log("Data successfully sent:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during AddTeam request:", error.response?.data || error);
      throw error;
    }
  };
  
  export const createNewMember = async (memberData) => {
    try {
      // Prepare the data as a JSON object (not FormData)
      const data = {
        UserName: memberData.userName,
        Email: memberData.email,
        PhoneNumber: memberData.phoneNumber,
        FName: memberData.fName,
        LName: memberData.lName,
        BirthDate: memberData.birthDate,
        Password: memberData.password,
        ConfirmPassword: memberData.confirmPassword,
      };
  
      const response = await axios.post(
        "https://zyan.tech/dashboard/api/user/CreateUser",
        data, // Send the data as JSON
        {
          headers: {
            "Content-Type": "application/json", // 
          },
        }
      );
  
      console.log("Data successfully sent:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during AddTeam request:", error.response?.data || error);
      throw error;
    }
  };
    

