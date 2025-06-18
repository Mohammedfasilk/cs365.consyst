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

    const bannerBase64 = req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : undefined;
    const { legalDisclaimer } = req.body;

    const updateFields = {};
    if (bannerBase64) updateFields.banner = bannerBase64;
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

