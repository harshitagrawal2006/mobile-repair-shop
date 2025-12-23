import express from "express";
import {
  addBrand,
  getAllBrands,
  getModelsByBrand,
  updateModelsByBrand,
  deleteBrand,
} from "../controllers/phoneController.js";

const router = express.Router();

/**
 * @swagger
 * /api/phones/add-brand:
 *   post:
 *     summary: Add new phone brand with models
 *     tags: [Phones]
 */
router.post("/add-brand", addBrand);

/**
 * @swagger
 * /api/phones/all-brands:
 *   get:
 *     summary: Get all phone brands
 *     tags: [Phones]
 */
router.get("/all-brands", getAllBrands);

/**
 * @swagger
 * /api/phones/models/{brand}:
 *   get:
 *     summary: Get models for a specific brand
 *     tags: [Phones]
 */
router.get("/models/:brand", getModelsByBrand);

/**
 * @swagger
 * /api/phones/update-models/{brand}:
 *   put:
 *     summary: Update models list of a brand
 *     tags: [Phones]
 */
router.put("/update-models/:brand", updateModelsByBrand);

/**
 * @swagger
 * /api/phones/delete-brand/{brand}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Phones]
 */
router.delete("/delete-brand/:brand", deleteBrand);

export default router;
