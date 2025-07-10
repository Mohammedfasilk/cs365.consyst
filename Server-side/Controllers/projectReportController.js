const Project = require('../Models/ProjectModel')

exports.getProjectReport = async (req,res) =>{
  const{project} = req.body
    try {
        const projectData = await Project.findOne(
      { project_name: project },
      {
        project_name: 1,
        budget:1,
        monthly_cost_control: 1
      }
    );
    if (!projectData) {
      return res.status(404).json({ error: "Project report not found" });
    }
      const approvedControls = projectData.monthly_cost_control?.filter(
      (entry) => entry.status === "approved"
    ) || [];

    res.status(200).json({
      project_name: projectData.project_name,
      budget: projectData.budget,
      monthly_cost_control: approvedControls,
    });
        
    }catch(err){
        res.status(500).json({error:'Failed to get Project reports'})
    }
}