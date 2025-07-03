const Activity = require('../Models/ActivityModel');

exports.updateActivity = async (req, res) => {
  try {
    const { field , data } = req.body;

    if(field === 'login') {
        const pushActivity = await Activity.findOneAndUpdate(
        {},
        {
          $push: { login: data },
        },
        { new: true,upsert:true }
      );

       return res.status(200).json(pushActivity);
    }

    const validFields = ['project_management', 'cost_control', 'settings'];
    if (!validFields.includes(field)) {
      return res.status(400).json({ error: "Invalid activity field." });
    }
    const pushActivity = await Activity.findOneAndUpdate(
      {},
      { $push: { [field]: data } },
      { new: true, upsert: true }
    );
        return res.status(200).json(pushActivity);
    
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update Activity" });
  }
};