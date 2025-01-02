import twilio from 'twilio';
import dotenv from "dotenv";

dotenv.config();

// Add debug logging
console.log('SMS Service Configuration:', {
  accountSid: process.env.TWILIO_ACCOUNT_SID ? 'AC...' + process.env.TWILIO_ACCOUNT_SID.slice(-4) : 'missing',
  authToken: process.env.TWILIO_AUTH_TOKEN ? '***' + process.env.TWILIO_AUTH_TOKEN.slice(-4) : 'missing',
  phoneNumber: process.env.TWILIO_PHONE_NUMBER || 'missing'
});

let client = null;

try {
  if (!process.env.TWILIO_ACCOUNT_SID?.startsWith('AC')) {
    throw new Error('Invalid Account SID format - must start with AC');
  }
  
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log('Twilio client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Twilio client:', error.message);
}

export const sendSMS = async ({ to, message }) => {
  if (!client) {
    console.error('Cannot send SMS: Twilio client not initialized');
    return false;
  }

  try {
    // Format the phone number
    let formattedPhone = to.replace(/\D/g, ''); // Remove non-digits
    
    // Ensure it starts with the country code
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '38' + formattedPhone;
    } else if (!formattedPhone.startsWith('38')) {
      formattedPhone = '38' + formattedPhone;
    }
    
    // Add the plus sign
    formattedPhone = '+' + formattedPhone;

    console.log('Sending SMS to:', formattedPhone);

    const result = await client.messages.create({
      body: message,
      to: formattedPhone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    console.log('SMS sent successfully:', result.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', {
      message: error.message,
      code: error.code,
      details: error.details || 'No additional details'
    });
    return false;
  }
}; 