const Notice = require("../Models/NoticeModel");

exports.createOrUpdateNotice = async (req, res) => {
  try {
    const { id, title, description, type, category, banner } = req.body;

    if (id) {
      // Update existing
      const notice = await Notice.findById(id);
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }

      notice.title = title;
      notice.description = description;
      notice.type = type;
      notice.category = category;
      if (banner) notice.banner = banner;

      await notice.save();
      return res.status(200).json({ message: "Notice updated", data: notice });
    } else {
      // Create new
      const newNotice = new Notice({
        title,
        description,
        type,
        category,
        banner: banner || null,
      });

      await newNotice.save();
      return res.status(201).json({ message: "Notice created", data: newNotice });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create or update notice" });
  }
};


exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notices" });
  }
};

exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    res.json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notice" });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.body;
    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    await notice.deleteOne();
    res.json({ message: "Notice deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete notice" });
  }
};
