const axios = require("axios");
const Project =require('../Models/ProjectModel')

exports.fetchProjectList = async (req, res) => {
  try {
    const searchQuery = req.body.search || "";
    const filters = JSON.stringify([
      ["project_name", "like", `%${searchQuery}%`],
      ["name", "like", "PJ-%"],
    ]);
    const response = await axios.get(
      `${
        process.env.ERPNEXT_BASE_URL
      }/api/resource/Project?fields=["name", "project_name", "sales_order"]&filters=${encodeURIComponent(
        filters
      )}&limit=20`,
      {
        headers: {
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
        },
      }
    );

    const ProjectsList = response.data.data;
    res.status(200).json(ProjectsList);
  } catch (error) {
    console.error("Error fetching Project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Projects.",
      error: error.message,
    });
  }
};

//project sales order

exports.fetchSalesOrder = async (req, res) => {
  try {
    const { sales_order } = req.body;
    const filters = encodeURIComponent(`[["name", "=", "${sales_order}"]]`);
    const response = await axios.get(
      `${process.env.ERPNEXT_BASE_URL}/api/resource/Sales Order?fields=["po_date","customer_name","currency","base_rounded_total","company","title","name"]&filters=${filters}`,
      {
        headers: {
          Authorization: `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`,
        },
      }
    );

    const salesOrder = response.data.data;
    res.status(200).json(salesOrder);
  } catch (error) {
    console.error("Error fetching Project Sales Order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Project Sales Order.",
      error: error.message,
    });
  }
};


// Create Project // 


exports.createProject = async (req, res) => {
  try {
    const data = req.body;

    const filter = { project_name: data?.project_name };

    const options = { new: true, upsert: true }; // Create if doesn't exist

    const result = await Project.findOneAndUpdate(filter, data, options);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: 'Failed to save Project' });
  }
};


//  get created projects //

exports.getProjects = async (req,res) =>{
    try {
        const projects = await Project.find({})
        res.status(200).json(projects)
    }catch(err){
        res.status(500).json({error:'Failed to get Projects'})
    }
}


// save budget //

exports.updateBudget = async (req, res) => {
  try {
    const {project_name,budget} = req.body;
    
     const result = await Project.findOneAndUpdate(
      { project_name: project_name },
      { $set: { budget: budget } },
      { new: true } 
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: 'Failed to save Project' });
  }
};

//Delete Project //

exports.deleteProject = async (req,res) =>{
  const {project_name} = req.body
  
    try {
        const Projects = await Project.findOneAndDelete({project_name:project_name})
        res.status(200).json(Projects)
    }catch(err){
        res.status(500).json({error:'Failed to delete Project'})
    }
}

// Update project status and stage

exports.updateProjectField = async (req, res) => {
  try {
    const { project_name, field, value, month } = req.body;
    console.log(month);

    const updated = await Project.findOneAndUpdate(
      { project_name,month },
      { [field]: value },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project field" });
  }
};
