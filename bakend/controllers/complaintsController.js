import Complaint from "../models/Complaint.js"

// Submit a new complaint
export async function createComplaint(req, res) {
  try {
    const { category, description, neighborhood, street } = req.body;
    if (!category || !description || !neighborhood) {
      return res.status(400).json({ error: "category, description and neighborhood are required" });
    }

    const images = req.files ? req.files.map(f => f.path) : [];

    const complaint = new Complaint({
      user: req.user.id,
      category,
      description,
      neighborhood,
      street,
      images
    });

    await complaint.save();
    res.json({ success: true, complaint });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to submit complaint" });
  }
}

// Get all complaints for the logged-in user
export async function getMyComplaints(req, res) {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
}

export async function getAllComplaints(req, res) {
  try {
    const complaints = await Complaint.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
}
export async function updateComplaintStatus(req, res) {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ error: "Complaint not found" });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
}