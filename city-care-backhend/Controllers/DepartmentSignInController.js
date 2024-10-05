// DepartmentSignInController.js

// Predefined department credentials (adjust IDs and passwords as needed)
const departments = {
    "Road Department": { id: "road123", password: "roadPass" },
    "Sewage Department": { id: "sewage123", password: "sewagePass" },
    "Waste Management Department": { id: "waste123", password: "wastePass" },
    "Street Light Department": { id: "streetlight123", password: "lightPass" },
  };
  
  // Controller for handling department login
  const handleDepartmentLogin = (req, res) => {
    const { id, password, department } = req.body;
  
    // Validate if the department exists
    if (!departments[department]) {
      return res.status(400).json({ message: "Invalid department" });
    }
  
    // Fetch department credentials
    const departmentCredentials = departments[department];
  
    // Check if the ID and password match
    if (departmentCredentials.id === id && departmentCredentials.password === password) {
      // Send success response if credentials match
      return res.status(200).json({ message: "Sign-in successful", department });
    } else {
      // Send error response if credentials do not match
      return res.status(401).json({ message: "Invalid id or password" });
    }
  };
  
  module.exports = { handleDepartmentLogin };
  