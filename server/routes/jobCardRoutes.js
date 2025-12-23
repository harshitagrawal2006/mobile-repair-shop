import express from "express";
import {
  createJobCard,
  addRequiredParts,
  updateJobStatus,
  getAllJobCards,
  getJobCardById,
} from "../controllers/jobCardController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Job Cards
 *   description: Mobile Repair Job Card APIs
 */

/**
 * @swagger
 * /api/job-cards:
 *   post:
 *     summary: Create Job Card (Admin)
 *     tags: [Job Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phoneNumber
 *               - phoneBrand
 *               - phoneModel
 *               - problemDescription
 *               - assignedMechanic
 *             properties:
 *               customerName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               alternateNumber:
 *                 type: string
 *               phoneBrand:
 *                 type: string
 *               phoneModel:
 *                 type: string
 *               problemDescription:
 *                 type: string
 *               assignedMechanic:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: Assigned
 *     responses:
 *       201:
 *         description: Job card created successfully
 */
router.post("/", createJobCard);

/**
 * @swagger
 * /api/job-cards:
 *   get:
 *     summary: Get All Job Cards
 *     tags: [Job Cards]
 *     responses:
 *       200:
 *         description: List of job cards
 */
router.get("/", getAllJobCards);

/**
 * @swagger
 * /api/job-cards/{id}:
 *   get:
 *     summary: Get Job Card By ID
 *     tags: [Job Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job card data
 *       404:
 *         description: Job card not found
 */
router.get("/:id", getJobCardById);

/**
 * @swagger
 * /api/job-cards/{id}/required-parts:
 *   put:
 *     summary: Add Required Parts (Mechanic)
 *     tags: [Job Cards]
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
 *               requiredParts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     partId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     qty:
 *                       type: number
 *                     price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Required parts added
 *       400:
 *         description: Stock issue
 */
router.put("/:id/required-parts", addRequiredParts);

/**
 * @swagger
 * /api/job-cards/{id}/status:
 *   put:
 *     summary: Update Job Status
 *     tags: [Job Cards]
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
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Status updated
 */
router.put("/:id/status", updateJobStatus);

export default router;
