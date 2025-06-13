const EmailSignature = require('../models/emailSignatureModel');

exports.saveEmailSignature = async (req, res) => {
  try {
    const { label, title, content, originalLabel } = req.body;
    const bannerPath = req.file ? req.file.path : null;

    if (!label || !title || !content) {
      return res.status(400).json({ error: 'Label, title, and content are required' });
    }

    const signature = await EmailSignature.findOneAndUpdate(
      { label: originalLabel || label },
      { label, title, content,},
      { upsert: true, new: true }
    );

    res.status(200).json(signature);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmailSignatures = async (req, res) => {
  try {
    const list = await EmailSignature.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmailSignature = async (req, res) => {
  try {
    const { label } = req.body;
    const existing = await EmailSignature.findOne({ label });

    if (!existing) {
      return res.status(404).json({ error: 'Signature not found' });
    }

    const deleted = await EmailSignature.findOneAndDelete({ label });
    res.status(200).json({ message: 'Deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
