import Part from "../models/partModel.js";

// ADD NEW PART
export const addPart = async (req, res) => {
  try {
    const { brand, model, partName, type, price, stock } = req.body;

    const exists = await Part.findOne({ brand, model, partName, type });
    if (exists) {
      return res.status(400).json({ message: "This part already exists!" });
    }

    const saved = await Part.create({
      brand,
      model,
      partName,
      type,
      price,
      stock
    });

    res.status(201).json({ message: "Part added", data: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PARTS
export const getAllParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PARTS BY BRAND + MODEL
export const getPartsByBrandModel = async (req, res) => {
  try {
    const { brand, model } = req.params;

    const parts = await Part.find({ brand, model });

    if (!parts.length) {
      return res.status(404).json({ message: "No parts found" });
    }

    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PART
export const updatePart = async (req, res) => {
  try {
    const updated = await Part.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({ message: "Part updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PART
export const deletePart = async (req, res) => {
  try {
    const deleted = await Part.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
