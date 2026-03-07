import express from "express";
import {
  getAllBrands,
  getModelsByBrand,
  addModel,
  updateModel,
  deleteModel
} from "../controllers/phone.controller.js";

const router = express.Router();

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
 * /api/phones/add-model:
 *   post:
 *     summary: Add a single model to a brand
 *     tags: [Phones]
 */
router.post("/add-model", addModel);

/**
 * @swagger
 * /api/phones/update-model/{brand}/{model}:
 *   put:
 *     summary: Update a specific model of a brand
 *     tags: [Phones]
 */
router.put("/update-model/:brand/:model", updateModel);

/**
 * @swagger
 * /api/phones/delete-model/{brand}/{model}:
 *   delete:
 *     summary: Delete a specific model from a brand
 *     tags: [Phones]
 */
router.delete("/delete-model/:brand/:model", deleteModel);

export default router;