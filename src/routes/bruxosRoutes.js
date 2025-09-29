import express from "express";
import { getAllbruxos, getbruxosByld, createbruxo, updatebruxo, deletebruxo } from "../controllers/bruxosControllers.js";

const router = express.Router();

router.get("/", getAllbruxos);
router.get("/:id", getbruxosByld);
router.post("/", createbruxo);
router.put("/:id", updatebruxo);
router.delete("/:id", deletebruxo);

export default router;