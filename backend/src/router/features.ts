import express from "express";
import { UserFeatureCreate } from "../controler/features";

const router = express.Router();

router.post("/:feature", UserFeatureCreate);

export default router;
