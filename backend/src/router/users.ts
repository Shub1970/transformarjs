//user router
import express from "express";
import { createGuestSession } from "../controler/users";
import { authMiddlewar } from "../middleware/auth";

const router = express.Router();
router.post("/guest-login", createGuestSession);
router.get("/cookie-check", (req, res) => {
  console.log("access_token", req.cookies.access_token);
  res.send(200);
});

export default router;
