const axios = require("axios");
const Project = require('../Models/ProjectModel')

exports.fetchProjectList = async (req, res) => {
  try {
    const {search} = req.body
    
    let query = {};
     if (search && search.trim() !== "") {
      query.project_title = {
        $regex: String(search.trim()),
        $options: "i"
      };
    }
    
    const projects = await Project.find(query).select("project_title -_id").limit(15);
    
          res.status(200).json(projects)
  } catch (error) {
    console.error("Error fetching Project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Projects.",
      error: error.message,
    });
  }
};