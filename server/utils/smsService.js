import twilio from 'twilio';

// Create Twilio client with explicit credentials
const createTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();
  
  console.log('Twilio Credentials Check:', {
    accountSid: accountSid ? `${accountSid.slice(0, 4)}...${accountSid.slice(-4)}` : 'missing',
    authToken: authToken ? `${authToken.slice(0, 4)}...${authToken.slice(-4)}` : 'missing',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER
  });

  if (!accountSid || !authToken) {
    console.error('Missing Twilio credentials');
    return null;
  }

  try {
    const client = twilio(accountSid, authToken);
    console.log('Twilio client created successfully');
    return client;
  } catch (error) {
    console.error('Error creating Twilio client:', error);
    return null;
  }
};

let client = null;

export const initializeTwilioClient = () => {
  if (!client) {
    client = createTwilioClient();
  }
  return client;
};

export const testSMSConfig = async () => {
  try {
    client = initializeTwilioClient();
    if (!client) {
      throw new Error('Twilio client not initialized');
    }

    const account = await client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
    console.log("Twilio account verified:", account.friendlyName);
    return true;
  } catch (error) {
    console.warn("SMS configuration warning:", error.message);
    return false;
  }
};

export const sendSMS = async ({ to, message }) => {
  try {
    client = initializeTwilioClient();
    if (!client) {
      throw new Error('Twilio client not initialized');
    }

    // Remove any formatting characters
    let cleanNumber = to.replace(/\D/g, '');
    
    // For Ukrainian numbers:
    // If starts with 0, remove it and add +380
    // If starts with 380, add +
    // If starts with neither, add +380
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '380' + cleanNumber.substring(1);
    } else if (cleanNumber.startsWith('380')) {
      cleanNumber = '380' + cleanNumber.substring(3);
    } else {
      cleanNumber = '380' + cleanNumber;
    }
    
    const fullNumber = `+${cleanNumber}`;
    
    console.log('Formatting phone number:', {
      original: to,
      cleaned: cleanNumber,
      final: fullNumber
    });

    const result = await client.messages.create({
      body: message,
      to: fullNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    console.log("SMS sent successfully:", result.sid);
    return true;
  } catch (error) {
    console.error("SMS Error:", {
      message: error.message,
      code: error.code,
      status: error.status,
      moreInfo: error.moreInfo
    });
    return false;
  }
}; 