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
    
    const projects = await Project.find(query).select("project_title project_name -_id").limit(15);
    
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


exports.getProjects = async (req,res) =>{
  const{project,month} = req.body
    try {
        const projectData = await Project.findOne(
      { project_name: project },
      {
        project_name: 1,
        project_title: 1,
        budget:1,
        monthly_cost_control: {
          $elemMatch: { month } 
        }
      }
    );
    if (!projectData) {
      return res.status(404).json({ error: "Project not found" });
    }
        res.status(200).json(projectData)
    }catch(err){
        res.status(500).json({error:'Failed to get Projects'})
    }
}


exports.updateMonthlyCost = async (req, res) => {
  try {
    const { project_name, monthlyData } = req.body;

    // 1. Try to update the specific month's data
    const updateResult = await Project.findOneAndUpdate(
      {
        project_name,
        "monthly_cost_control.month": monthlyData.month,
      },
      {
        $set: {
          "monthly_cost_control.$": monthlyData,
        },
      },
      { new: true }
    );

    // 2. If month not found, push new data
    if (!updateResult) {
      const pushResult = await Project.findOneAndUpdate(
        { project_name },
        {
          $push: { monthly_cost_control: monthlyData },
        },
        { new: true }
      );

      return res.status(200).json(pushResult);
    }

    return res.status(200).json(updateResult);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update monthly cost data" });
  }
};

exports.fetchCostControlProjects = async (req, res) => {
  try {
    const { search } = req.body;

    const query = {
      monthly_cost_control : { $exists: true, $not: { $size: 0 }  } // Only projects with this field
    };

    if (search?.trim()) {
      query.project_title = {
        $regex: search.trim(),
        $options: "i"
      };
    }

    const projects = await Project.find(query)
      .select("project_title project_name -_id")
      .limit(10);

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching Project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Projects.",
      error: error.message,
    });
  }
};


exports.getMonthlyBudget = async (req,res) =>{
  const{project_name} = req.body
    try {
        const projectData = await Project.findOne(
      { project_name: project_name },
      {
        monthly_cost_control:1
      }
    );
        res.status(200).json(projectData)
    }catch(err){
        res.status(500).json({error:'Failed to get Projects'})
    }
}