const Settings = require("../Models/settingsModel");

exports.saveSettings = async (req, res) => {
  try {
    const data = req.body;
    
    if (data.currentFyStartDate) {      
    }
    const updated = await Settings.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to save settings" });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({});
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to get settings" });
  }
};
