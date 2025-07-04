const Project = require('../Models/ProjectModel')

exports.updateTimelineTask = async (req, res) => {
  try {
    const { project_name, timeline } = req.body;
    // Convert start_date and end_date to string (YYYY-MM-DD)
    const toDateString = d => {
      if (!d) return d;
      const date = new Date(d);
      if (!isNaN(date)) return date.toISOString().slice(0, 10);
      return d;
    };
    const { id , milestone, start_date, end_date, duration, key_deliverables, weight } = timeline;
    const startDateStr = toDateString(start_date);
    const endDateStr = toDateString(end_date);

    const updateTask = await Project.findOneAndUpdate(
      {
        project_name,
        "timeline.milestone": milestone ,
      },
      {
        $set: {
          "timeline.$.start_date": startDateStr,
          "timeline.$.end_date": endDateStr,
          "timeline.$.duration": duration,
          "timeline.$.key_deliverables": key_deliverables,
          "timeline.$.weight": weight,
        },
      },
      { new: true }
    );

    // 2. If month not found, push new data
    if (!updateTask) {
      const pushTask = await Project.findOneAndUpdate(
        { project_name },
        {
          $push: { timeline: timeline },
        },
        { new: true }
      );
      return res.status(200).json(pushTask);      
    }


    return res.status(200).json(updateTask);
    
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update timeline" });
  }
};

exports.getTimelineTasks = async (req,res) =>{
  const{project_name} = req.body
    try {
        const projectData = await Project.findOne(
      { project_name: project_name },
      {
        timeline:1
      }
    );
        res.status(200).json(projectData)
    }catch(err){
        res.status(500).json({error:'Failed to get timeline'})
    }
}

exports.deleteTimelineTasks = async (req,res) =>{
  const { task , project_name } = req.body
      try {
     const updatedTask = await Project.findOneAndUpdate(
       { project_name },
       { $pull: { timeline: { task } } },
       { new: true }
     );
 
     if (!updatedTask) {
       return res.status(404).json({ error: "timeline not found" });
     }
 
     res.status(200).json({
       message: `task deleted successfully.`,
     });
   }catch(err){
         res.status(500).json({error:'Failed to Delete Task'})
     }
}

exports.getTimelineProjects = async (req, res) => {
  try {
    const { search = "" } = req.body || {};
    // Build search filter for project_name (case-insensitive)
    const filter = {
      timeline: { $exists: true, $not: { $size: 0 } },
    };
    if (search && search.trim() !== "") {
      filter.project_name = { $regex: search, $options: "i" };
    }
    const projects = await Project.find(
      filter,
      {
        project_name: 1,
      }
    );
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get projects with timeline' });
  }
};

const getPreviousMonth = (monthStr) => {
  const date = new Date(monthStr + ' 01');
  date.setMonth(date.getMonth() - 1);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const prevMonth = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${prevMonth} ${year}`;
};

exports.fetchTasks = async (req, res) => {
  try {
    const { project_name, month } = req.body;

    if (!project_name) {
      return res.status(400).json({ error: 'project_name is required' });
    }

    if (month) {
      const prevMonth = getPreviousMonth(month);

      // Get both current and previous month schedules
      const project = await Project.findOne(
        {
          project_name,
          schedules: {
            $elemMatch: { month },
          },
        },
        { schedules: 1, _id: 0 }
      );

      if (project && project.schedules && project.schedules.length > 0) {
        const currentSchedule = project.schedules.find(s => s.month === month);
        const prevSchedule = project.schedules.find(s => s.month === prevMonth);

        return res.status(200).json({
          month,
          schedule: currentSchedule || null,
          previous_month: prevMonth,
          previous_schedule: prevSchedule || null,
        });
      }
    }

    // If no month or no schedules found, return the timeline
    const project = await Project.findOne(
      { project_name },
      { timeline: 1, _id: 0 }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({ timeline: project.timeline });

  } catch (err) {
    console.error("Fetch Tasks Error:", err);
    res.status(500).json({ error: 'Failed to fetch project tasks/schedules' });
  }
};

exports.saveSchedules = async (req, res) => {
  try {
    const { project_name, month, milestones } = req.body;
    if (!project_name || !month || !Array.isArray(milestones)) {
      return res.status(400).json({ error: 'project_name, month, and milestones are required' });
    }
    // Upsert the schedule for the given month
    const update = await Project.findOneAndUpdate(
      { project_name, "schedules.month": month },
      {
        $set: {
          "schedules.$.milestones": milestones
        }
      },
      { new: true }
    );
    if (update) {
      return res.status(200).json(update);
    }
    // If not found, push a new schedule
    const push = await Project.findOneAndUpdate(
      { project_name },
      {
        $push: {
          schedules: { month, milestones }
        }
      },
      { new: true }
    );
    return res.status(200).json(push);
  } catch (err) {
    console.error("Save Schedules Error:", err);
    res.status(500).json({ error: 'Failed to save schedules' });
  }
};

// Fetch schedules as a flat array: { project_name, month, status, stage }
exports.fetchSchedules = async (req, res) => {
  try {
    const { project_name } = req.body || {};
    const filter = project_name ? { project_name } : {};
    const projects = await Project.find(filter, {
      project_name: 1,
      project_description: 1,
      stage: 1,
      schedules: 1,
      _id: 0
    });
    // Flatten all schedules into a single array with project_name and project_description
    const result = [];
    projects.forEach(p => {
      (p.schedules || []).forEach(s => {
        result.push({
          project_name: p.project_name,
          stage:p.stage,
          project_description: p.project_description,
          month: s.month,
          status: s.status,
        });
      });
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
};

exports.deleteSchedule = async (req,res) =>{
  const { month , project_name } = req.body
     try {
    const updatedProject = await Project.findOneAndUpdate(
      { project_name },
      { $pull: { schedules: { month } } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json({
      message: `Schedule for ${month} deleted successfully.`,
    });
  }catch(err){
        res.status(500).json({error:'Failed to Delete Schedule'})
    }
}

exports.updateStatus = async (req,res)=>{
   try {
      const { project_name, monthlySchedule} = req.body;
      const { month , status } = monthlySchedule
      // 1. Try to update the specific month's data
      
      const updateProject = await Project.findOneAndUpdate(
        {
          project_name,
          "schedules.month": month,
        },
        {
          $set: {
            "schedules.$.status": status,
          },
        },
        { new: true }
      );
  


        return res.status(200).json(updateProject);      
      
  
  

      
    }catch (err) {
      console.error("Update Error:", err);
      res.status(500).json({ error: "Failed to update status" });
    }
}