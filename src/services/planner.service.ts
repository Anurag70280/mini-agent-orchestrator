// src/services/planner.service.ts
import { Task } from "../types/task.types";

export class PlannerService {
  async createPlan(input: string): Promise<Task[]> {
    const tasks: Task[] = [];
    
    const orderMatch = input.match(/#(\d+)/);
    const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  
    const phoneMatches = input.match(/(?:\+?\d{1,3}[- ]?)?\d{10}/g);

    if (orderMatch) {
      tasks.push({
        type: "cancel_order",
        payload: { orderId: orderMatch[1] },
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

    if (phoneMatches) {
     
      if (input.toLowerCase().includes("otp")) {
        tasks.push({
          type: "send_otp",
          payload: { phone: phoneMatches[0] },
        });
      } else {
    
        phoneMatches.forEach(phone => {
          tasks.push({
            type: "send_sms",
            payload: { 
              phone, 
              message: "Your request has been processed successfully." 
            },
          });
        });
      }
    }

    return tasks;
  }
}