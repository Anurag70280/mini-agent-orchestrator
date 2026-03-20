// src/types/task.types.ts
export type Task =
  | {
      type: "cancel_order";
      payload: { orderId: string };
    }
  | {
      type: "send_email";
      payload: { email: string; message: string };
    }
  | {
      type: "send_sms";
      payload: { phone: string; message: string };
    }
  | {
      type: "send_otp";
      payload: { phone: string };
    };

export type ExecutionResult = {
  task: string;
  status: "success" | "failed" | "skipped";
  details?: any;
};