import express from "express";
import {
  createJobCard,
  addRequiredParts,
  updateJobStatus,
  getAllJobCards,
  getJobCardById,
} from "../controllers/jobcard.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/constants.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Job Cards
 *   description: Mobile Repair Job Card Management
 */

/**
 * @swagger
 * /api/jobcards:
 *   post:
 *     summary: Create Job Card (Admin only)
 *     tags: [Job Cards]
 *     security:
 *       - bearerAuth: []
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
 *                 example: Rahul Kumar
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               alternateNumber:
 *                 type: string
 *                 example: "9876543211"
 *               phoneBrand:
 *                 type: string
 *                 example: Samsung
 *               phoneModel:
 *                 type: string
 *                 example: Galaxy S23
 *               problemDescription:
 *                 type: string
 *                 example: Screen broken, battery drain issue
 *               assignedMechanic:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               status:
 *                 type: string
 *                 example: Assigned
 *     responses:
 *       201:
 *         description: Job card created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, authorize(ROLES.ADMIN), createJobCard);

/**
 * @swagger
 * /api/jobcards:
 *   get:
 *     summary: Get All Job Cards
 *     tags: [Job Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of job cards retrieved successfully
 */
router.get("/", protect, authorize(ROLES.ADMIN, ROLES.MECHANIC), getAllJobCards);

/**
 * @swagger
 * /api/jobcards/{id}:
 *   get:
 *     summary: Get Job Card By ID
 *     tags: [Job Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Job card retrieved successfully
 *       404:
 *         description: Job card not found
 */
router.get("/:id", protect, authorize(ROLES.ADMIN, ROLES.MECHANIC), getJobCardById);

/**
 * @swagger
 * /api/jobcards/{id}/required-parts:
 *   put:
 *     summary: Add Required Parts (Mechanic/Admin)
 *     tags: [Job Cards]
 *     security:
 *       - bearerAuth: []
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
 *                       example: 507f1f77bcf86cd799439011
 *                     name:
 *                       type: string
 *                       example: Display
 *                     qty:
 *                       type: number
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 3500
 *     responses:
 *       200:
 *         description: Required parts added successfully
 *       400:
 *         description: Stock issue or validation error
 */
router.put("/:id/required-parts", protect, authorize(ROLES.ADMIN, ROLES.MECHANIC), addRequiredParts);

/**
 * @swagger
 * /api/jobcards/{id}/status:
 *   put:
 *     summary: Update Job Status
 *     tags: [Job Cards]
 *     security:
 *       - bearerAuth: []
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
 *                 enum: [Assigned, In Progress, Completed, Delivered]
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.put("/:id/status", protect, authorize(ROLES.ADMIN, ROLES.MECHANIC), updateJobStatus);

export default router;
