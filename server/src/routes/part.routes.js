import express from "express";
import {
  addPart,
  getAllParts,
  getPartsByBrandModel,
  updatePart,
  deletePart
} from "../controllers/part.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/parts/add-part:
 *   post:
 *     summary: Add a new part (Admin)
 *     tags: [Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - partName
 *               - type
 *               - price
 *               - stock
 *             properties:
 *               brand:
 *                 type: string
 *                 example: Samsung
 *               model:
 *                 type: string
 *                 example: A51
 *               partName:
 *                 type: string
 *                 example: Display
 *               type:
 *                 type: string
 *                 enum: [original, copy]
 *                 example: original
 *               price:
 *                 type: number
 *                 example: 3500
 *               stock:
 *                 type: number
 *                 example: 10
 */
router.post("/add-part", addPart);

/**
 * @swagger
 * /api/parts/all-parts:
 *   get:
 *     summary: Get all available parts
 *     tags: [Parts]
 */
router.get("/all-parts", getAllParts);

/**
 * @swagger
 * /api/parts/by-phone/{brand}/{model}:
 *   get:
 *     summary: Get parts by phone brand and model (Mechanic)
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *         example: Samsung
 *       - in: path
 *         name: model
 *         required: true
 *         schema:
 *           type: string
 *         example: A51
 */
router.get("/by-phone/:brand/:model", getPartsByBrandModel);

/**
 * @swagger
 * /api/parts/update/{id}:
 *   put:
 *     summary: Update a part by ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 */
router.put("/update/:id", updatePart);

/**
 * @swagger
 * /api/parts/delete/{id}:
 *   delete:
 *     summary: Delete a part by ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/delete/:id", deletePart);

export default router;
