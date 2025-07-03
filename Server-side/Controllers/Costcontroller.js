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
    const { month, current, projected, status, stage } = monthlyData
    // 1. Try to update the specific month's data
    const updateProject = await Project.findOneAndUpdate(
      {
        project_name,
        "monthly_cost_control.month": month,
      },
      {
        $set: {
          "monthly_cost_control.$.current": current,
          "monthly_cost_control.$.projected": projected,
          "monthly_cost_control.$.status": status,
          "monthly_cost_control.$.stage": stage,
        },
      },
      { new: true }
    );

    // 2. If month not found, push new data
    if (!updateProject) {
      const pushProject = await Project.findOneAndUpdate(
        { project_name },
        {
          $push: { monthly_cost_control: monthlyData },
        },
        { new: true }
      );


      return res.status(200).json(pushProject);      
    }


    return res.status(200).json(updateProject);
    
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

exports.getAllMonthlyBudget = async (req, res) => {
  try {
    const projects = await Project.aggregate([
      {
        $match: {
          monthly_cost_control: { $exists: true, $not: { $size: 0 } }
        }
      },
      {
        $project: {
          _id: 0,
          project_name: 1,
          project_description:1,
          stage:1,
          monthly_cost_control: {
            $map: {
              input: "$monthly_cost_control",
              as: "item",
              in: { month: "$$item.month" , status:"$$item.status" , stage:"$$item.stage" } // Only include month
            }
          }
        }
      },
    ]);
    
    res.status(200).json(projects);
    
  } catch (err) {
    console.error("Error fetching monthly budget data:", err);
    res.status(500).json({ error: 'Failed to get monthly budget data' });
  }
};


exports.deleteMonthlyBudget = async (req,res) =>{
  const { month , project_name } = req.body
     try {
    const updatedProject = await Project.findOneAndUpdate(
      { project_name },
      { $pull: { monthly_cost_control: { month } } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: `Monthly budget for ${month} deleted successfully.`,
    });
  }catch(err){
        res.status(500).json({error:'Failed to Delete Monthly Budget'})
    }
}