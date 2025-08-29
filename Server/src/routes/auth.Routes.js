import express from "express";
import { registerUser, loginUser, verifyRegistration, logoutUser, refreshTokenHandler } from "../controllers/auth.Controller.js";

const router = express.Router();

router.post("/signup/verify", verifyRegistration);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshTokenHandler);

export default router;
