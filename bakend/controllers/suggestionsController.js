import Suggestion from "../models/Suggestion.js"

export async function createSuggestion(req, res) {
  try {
    const { title, neighborhood, category, description, impact } = req.body;
    if (!title || !neighborhood || !category || !description)
      return res.status(400).json({ error: "جميع الحقول المطلوبة يجب تعبئتها" });

    const files = req.files ? req.files.map(f => f.path) : [];
    const suggestion = new Suggestion({ user: req.user.id, title, neighborhood, category, description, impact, files });
    await suggestion.save();
    res.json({ success: true, suggestion });
  } catch (error) {
    res.status(500).json({ error: "فشل تقديم المقترح" });
  }
}

export async function getMySuggestions(req, res) {
  try {
    const suggestions = await Suggestion.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: "فشل جلب المقترحات" });
  }
}

export async function getAllSuggestions(req, res) {
  try {
    const suggestions = await Suggestion.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: "فشل جلب المقترحات" });
  }
}
export async function updateSuggestionStatus(req, res) {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!suggestion) return res.status(404).json({ error: "Suggestion not found" });
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
}