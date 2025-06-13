const EmailSignatureGlobal = require('../Models/emailSignatureGlobalModel');

exports.getGlobalSettings = async (req, res) => {
  try {
    let global = await EmailSignatureGlobal.findOne();
    if (!global) {
      global = await EmailSignatureGlobal.create({ banner: '', legalDisclaimer: '' });
    }
    res.json(global);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch global settings' });
  }
};

exports.updateGlobalSettings = async (req, res) => {
  try {

    const bannerPath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const { legalDisclaimer } = req.body;

    const updateFields = {};
    if (bannerPath) updateFields.banner = bannerPath;
    if (legalDisclaimer !== undefined) updateFields.legalDisclaimer = legalDisclaimer;

    const updatedGlobal = await EmailSignatureGlobal.findOneAndUpdate(
      {},
      { $set: updateFields },
      { upsert: true, new: true }
    );

    res.json({ message: 'Global settings updated', data: updatedGlobal });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update global settings' });
  }
};
