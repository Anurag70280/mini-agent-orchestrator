// src/tools/sms.tool.ts
export async function sendSMS(phone: string, message: string) {

  await new Promise((resolve) => setTimeout(resolve, 800));
  
  return {
    success: true,
    phone,
    message: `SMS sent: ${message}`,
  };
}

export async function sendOTP(phone: string) {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    phone,
    otp, 
    message: `OTP ${otp} sent to ${phone}`,
  };
}