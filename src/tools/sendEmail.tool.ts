export async function sendEmail(email: string, message: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    email,
    message: "Email sent successfully",
  };
}