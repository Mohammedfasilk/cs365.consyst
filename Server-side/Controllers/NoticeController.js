const Notice = require('../Models/NoticeModel');

exports.createNotice = async (req, res) => {
  try {
    const { title, description, type, category } = req.body;
    const banner = req.file?.path; // multer saves this

    const newNotice = new Notice({
      title,
      description,
      type,
      category,
      banner,
    });
    
    await newNotice.save();
    res.status(201).json({ message: 'Notice created', data: newNotice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create notice' });
  }
};

exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};
