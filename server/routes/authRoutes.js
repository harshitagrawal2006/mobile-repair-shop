import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication (Admin + Mechanic)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: Rohit Sharma
 *         email:
 *           type: string
 *           example: rohit@gmail.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         password:
 *           type: string
 *           example: Rohit@123
 *         role:
 *           type: string
 *           enum: [admin, mechanic]
 *           example: mechanic
 *
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: rohit@gmail.com
 *         password:
 *           type: string
 *           example: Rohit@123
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user (Admin/Mechanic)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user (Admin/Mechanic)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token & role
 *       400:
 *         description: Wrong password
 *       404:
 *         description: User not found
 */
router.post("/login", loginUser);

export default router;
