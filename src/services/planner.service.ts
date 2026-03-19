import { Task } from "../types/task.types";

export class PlannerService {
  async createPlan(input: string): Promise<Task[]> {
    const orderMatch = input.match(/#(\d+)/);
    const emailMatch = input.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
    );

    const tasks: Task[] = [];

    if (orderMatch) {
      tasks.push({
        type: "cancel_order",
        payload: {
          orderId: orderMatch[1],
        },
      });
    }

    if (emailMatch) {
      tasks.push({
        type: "send_email",
        payload: {
          email: emailMatch[0],
          message: "Your order has been cancelled successfully.",
        },
      });
    }

    return tasks;
  }
}