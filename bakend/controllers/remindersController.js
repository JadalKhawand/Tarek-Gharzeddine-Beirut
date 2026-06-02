import Reminder from "../models/Reminder.js"

export async function subscribe(req, res) {
  try {
    const { projectTitle, projectTag } = req.body;
    if (!projectTitle) return res.status(400).json({ error: "projectTitle is required" });

    const existing = await Reminder.findOne({ user: req.user.id, projectTitle });
    if (existing) return res.status(400).json({ error: "مشترك مسبقاً في هذا المشروع", subscribed: true });

    const reminder = new Reminder({ user: req.user.id, projectTitle, projectTag });
    await reminder.save();
    res.json({ success: true, message: "تم الاشتراك بنجاح" });
  } catch (error) {
    res.status(500).json({ error: "فشل الاشتراك" });
  }
}

export async function getMyReminders(req, res) {
  try {
    const reminders = await Reminder.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "فشل جلب التذكيرات" });
  }
}

export async function unsubscribe(req, res) {
  try {
    await Reminder.findOneAndDelete({ user: req.user.id, projectTitle: req.params.title });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "فشل إلغاء الاشتراك" });
  }
}