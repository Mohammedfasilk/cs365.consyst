const Project = require('../Models/ProjectModel')

exports.updateTimelineTask = async (req, res) => {
  try {
    const { project_name, timeline } = req.body;
    const { id , task, start_date, end_date, duration } = timeline
    
    const updateTask = await Project.findOneAndUpdate(
      {
        project_name,
        "timeline.task": task ,
      },
      {
        $set: {
          "timeline.$.start_date": start_date,
          "timeline.$.end_date": end_date,
          "timeline.$.duration": duration,
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
