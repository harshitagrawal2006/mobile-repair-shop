import Phone from "../models/phoneModel.js";

// ADD BRAND + MODELS
export const addBrand = async (req, res) => {
  try {
    const { brand, models } = req.body;

    const exists = await Phone.findOne({ brand });
    if (exists) {
      return res.status(400).json({ message: "Brand already exists!" });
    }

    const saved = await Phone.create({ brand, models });
    res.status(201).json({ message: "Brand added", data: saved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL BRANDS
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Phone.find({}, { brand: 1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MODELS BY BRAND
export const getModelsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;

    const data = await Phone.findOne({ brand });

    if (!data) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE MODELS OF BRAND
export const updateModelsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const { models } = req.body;

    const updated = await Phone.findOneAndUpdate(
      { brand },
      { models },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Models updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE BRAND
export const deleteBrand = async (req, res) => {
  try {
    const { brand } = req.params;

    const deleted = await Phone.findOneAndDelete({ brand });

    if (!deleted) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
