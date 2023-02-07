import express from "express";
import { body } from "express-validator";
import checkJWT from "../../middleware/checkJWT";
import { registerUser, loginUser, putUser, deleteUser } from "../controller/user";
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

//  Post /user/register
router.post("/register", body("email").isEmail(), body("password").isLength({ min: 6 }), registerUser);

// Post /user/login
router.post("/login", loginUser);

// Put /user/:id
router.put("/:id", checkJWT, putUser);

// Delete /user/:id
router.delete("/:id", checkJWT, deleteUser);

export default router;
