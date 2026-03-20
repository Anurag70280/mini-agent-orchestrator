// src/services/orchestrator.service.ts
import { Task, ExecutionResult } from "../types/task.types";
import { cancelOrder } from "../tools/cancelOrder.tool";
import { sendEmail } from "../tools/sendEmail.tool";
import { sendSMS, sendOTP } from "../tools/sms.tool";

export class OrchestratorService {
  async execute(tasks: Task[]): Promise<ExecutionResult[]> {
    const results: ExecutionResult[] = [];

    for (const task of tasks) {
      try {
        let result;
        if (task.type === "cancel_order") {
          result = await cancelOrder(task.payload.orderId);
        } else if (task.type === "send_email") {
          result = await sendEmail(task.payload.email, task.payload.message);
        } else if (task.type === "send_sms") {
          result = await sendSMS(task.payload.phone, task.payload.message);
        } else if (task.type === "send_otp") {
          result = await sendOTP(task.payload.phone);
        }

        results.push({
          task: task.type,
          status: "success",
          details: result,
        });
      } catch (error: any) {
        results.push({
          task: task.type,
          status: "failed",
          details: error.message,
        });
        break; // Stop execution on failure
      }
    }
    return results;
  }
}