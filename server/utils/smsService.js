import twilio from 'twilio';
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async ({ to, message }) => {
  try {
    // Ensure the phone number starts with +
    const formattedPhone = to.startsWith("+") ? to : `+${to}`;

    const result = await client.messages.create({
      body: message,
      to: formattedPhone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    console.log("SMS sent successfully:", result.sid);
    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    // Don't throw error to prevent appointment creation failure
    return false;
  }
}; 