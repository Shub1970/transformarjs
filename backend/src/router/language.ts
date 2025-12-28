//language router
//
import express from "express";
import { createLanguage, getLanguage } from "../controler/language";

const router = express.Router();

router.post("/", createLanguage);
router.get("/", getLanguage);

export default router;
