const Settings = require("../Models/settingsModel");

exports.saveSettings = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    if (data.currentFyStartDate) {
      const date = new Date(data.currentFyStartDate);

      // Convert to local date parts (e.g. IST)
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");

      data.currentFyStartDate = `${yyyy}-${mm}-${dd}`;
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
