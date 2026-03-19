export async function cancelOrder(orderId: string) {
  const failed = Math.random() < 0.2;

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (failed) {
    throw new Error(`Failed to cancel order ${orderId}`);
  }

  return {
    success: true,
    orderId,
    message: "Order cancelled successfully",
  };
}