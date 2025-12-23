//user router
import express from "express";
import { createGuestUser } from "../controler/users";

const router = express.Router();

router.post("/guest", createGuestUser);

export default router;
