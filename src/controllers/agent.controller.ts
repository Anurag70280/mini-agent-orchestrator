import { Request, Response } from "express";
import { PlannerService } from "../services/planner.service";
import { OrchestratorService } from "../services/orchestrator.service";

const planner = new PlannerService();
const orchestrator = new OrchestratorService();

export async function executeAgent(req: Request, res: Response) {
  const { input } = req.body;

  const plan = await planner.createPlan(input);

  const result = await orchestrator.execute(plan);

  res.json({
    plan,
    result,
  });
}