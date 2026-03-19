export type Task =
  | {
      type: "cancel_order";
      payload: {
        orderId: string;
      };
    }
  | {
      type: "send_email";
      payload: {
        email: string;
        message: string;
      };
    };

export type ExecutionResult = {
  task: string;
  status: "success" | "failed" | "skipped";
  details?: any;
};