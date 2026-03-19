import { Task, ExecutionResult } from "../types/task.types";
import { cancelOrder } from "../tools/cancelOrder.tool";
import { sendEmail } from "../tools/sendEmail.tool";

export class OrchestratorService {
  async execute(tasks: Task[]): Promise<ExecutionResult[]> {
    const results: ExecutionResult[] = [];

    for (const task of tasks) {
      try {
        if (task.type === "cancel_order") {
          const result = await cancelOrder(task.payload.orderId);

          results.push({
            task: task.type,
            status: "success",
            details: result,
          });
        }

        if (task.type === "send_email") {
          const result = await sendEmail(
            task.payload.email,
            task.payload.message
          );

          results.push({
            task: task.type,
            status: "success",
            details: result,
          });
        }
      } catch (error: any) {
        results.push({
          task: task.type,
          status: "failed",
          details: error.message,
        });

        break;
      }
    }

    return results;
  }
}