//user router
import express from "express";
import {
  createGuestSession,
  googleAuthInit,
  googleAuthCallback,
  getCurrentUser,
  logout,
} from "../controler/users";
import { authMiddlewar } from "../middleware/auth";

const router = express.Router();

// Guest login
router.post("/guest-login", createGuestSession);

// Google OAuth
router.get("/google", googleAuthInit);
router.get("/google/callback", googleAuthCallback);

// User info and logout
router.get("/me", getCurrentUser);
router.post("/logout", logout);

// Debug route
router.get("/cookie-check", (req, res) => {
  console.log("access_token", req.cookies.access_token);
  res.send(200);
});

export default router;
