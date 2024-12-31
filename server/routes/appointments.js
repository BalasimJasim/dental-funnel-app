import express from 'express';
import Appointment from '../models/Appointment.js';
import { sendEmail } from '../utils/emailService.js';
import { sendSMS } from '../utils/smsService.js';

const router = express.Router();

// Get available time slots for a specific date
router.get('/available-slots/:date', async (req, res) => {
  const { date } = req.params;
  // Add logic to check existing appointments and return available slots
  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00'];
  res.json({ slots });
});

// Book an appointment
router.post('/', async (req, res) => {
  console.log('Received appointment request:', req.body);
  try {
    const { date, time, patientInfo, serviceId } = req.body;
    
    // Log the phone number for debugging
    console.log('Original phone number:', patientInfo.phone);
    
    // Clean the phone number
    const cleanPhone = patientInfo.phone.replace(/\D/g, '');
    console.log('Cleaned phone number:', cleanPhone);
    
    // Create appointment with cleaned phone number
    const appointment = await Appointment.create({
      date,
      time,
      patientInfo: {
        ...patientInfo,
        phone: cleanPhone // Store clean number
      },
      serviceId
    });

    // Send confirmation email
    const emailHtml = `
      <h2>Appointment Confirmation</h2>
      <p>Dear ${patientInfo.name},</p>
      <p>Your appointment has been scheduled for ${date} at ${time}.</p>
      <p>Thank you for choosing our dental clinic!</p>
    `;
    
    // Send notifications in parallel
    const [emailSent, smsSent] = await Promise.all([
      sendEmail(patientInfo.email, 'Appointment Confirmation', emailHtml),
      sendSMS({
        to: cleanPhone,
        message: `Your dental appointment is confirmed for ${date} at ${time}. Reply Y to confirm or call us to reschedule.`
      })
    ]);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId: appointment._id,
      details: appointment,
      notifications: {
        email: emailSent,
        sms: smsSent
      }
    });
  } catch (error) {
    console.error('Server error processing appointment:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Could not book appointment'
    });
  }
});

export default router; 