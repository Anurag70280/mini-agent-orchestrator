import { Router } from "express";
import { executeAgent } from "../controllers/agent.controller";

const router = Router();

router.post("/execute", executeAgent);

export default router;