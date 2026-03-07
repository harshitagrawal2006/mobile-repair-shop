import express from "express";
import {
  addBrand,
  getAllBrands,
  getModelsByBrand,
  updateModelsByBrand,
  deleteBrand,
  addModel,
  updateModel,
  deleteModel
} from "../controllers/phone.controller.js";

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