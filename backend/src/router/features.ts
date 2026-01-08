import express from "express";
import { UserFeatureCreate, GetTotalFeatureUsage } from "../controler/features";

const router = express.Router();

router.post("/", UserFeatureCreate);
router.get("/total", GetTotalFeatureUsage);

export default router;
