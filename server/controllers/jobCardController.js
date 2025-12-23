import JobCard from "../models/jobCardModel.js";
import Part from "../models/partModel.js";

/**
 * CREATE JOB CARD (ADMIN)
 */
export const createJobCard = async (req, res) => {
  try {
    const jobCard = await JobCard.create({
      customerName: req.body.customerName,
      phoneNumber: req.body.phoneNumber,
      alternateNumber: req.body.alternateNumber,
      phoneBrand: req.body.phoneBrand,
      phoneModel: req.body.phoneModel,
      problemDescription: req.body.problemDescription,
      assignedMechanic: req.body.assignedMechanic,
      status: req.body.status || "Assigned",
      requiredParts: [], // mechanic fill karega
    });

    res.status(201).json({
      message: "Job card created successfully",
      data: jobCard,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * ADD REQUIRED PARTS (MECHANIC)
 */
export const addRequiredParts = async (req, res) => {
  try {
    const jobCard = await JobCard.findById(req.params.id);
    if (!jobCard)
      return res.status(404).json({ message: "Job card not found" });

    for (const item of req.body.requiredParts) {
      const part = await Part.findById(item.partId);
      if (!part)
        return res.status(404).json({ message: "Part not found" });

      if (part.stock < item.qty) {
        return res
          .status(400)
          .json({ message: `Stock kam hai for ${part.partName}` });
      }

      part.stock -= item.qty;
      await part.save();
    }

    jobCard.requiredParts = req.body.requiredParts;
    jobCard.status = "In Progress";
    await jobCard.save();

    res.json({
      message: "Required parts added",
      data: jobCard,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE JOB STATUS
 */
export const updateJobStatus = async (req, res) => {
  try {
    const updated = await JobCard.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Job card not found" });

    res.json({
      message: "Status updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL JOB CARDS
 */
export const getAllJobCards = async (req, res) => {
  try {
    const cards = await JobCard.find()
      .populate("assignedMechanic", "name phone")
      .populate("requiredParts.partId");

    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET SINGLE JOB CARD
 */
export const getJobCardById = async (req, res) => {
  try {
    const card = await JobCard.findById(req.params.id)
      .populate("assignedMechanic", "name phone")
      .populate("requiredParts.partId");

    if (!card)
      return res.status(404).json({ message: "Job card not found" });

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
