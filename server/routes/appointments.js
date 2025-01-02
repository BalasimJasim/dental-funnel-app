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
router.post("/", async (req, res) => {
  try {
    const appointmentData = req.body;

    // Format the date and time for SMS
    const formattedDate = new Date(appointmentData.date).toLocaleDateString(
      "uk-UA"
    );
    const formattedTime = appointmentData.time;

    // Clean the phone number
    const cleanPhone = appointmentData.phone.replace(/\D/g, "");

    // Prepare SMS message
    const smsMessage = `Ваш запис підтверджено! Дата: ${formattedDate}, Час: ${formattedTime}. Дякуємо за довіру! Очікуйте на дзвінок від адміністратора.`;

    console.log("Attempting to send SMS:", {
      phone: cleanPhone,
      date: formattedDate,
      time: formattedTime,
    });

    // Send SMS
    const smsSent = await sendSMS({
      to: cleanPhone,
      message: smsMessage,
    });

    console.log("SMS sending result:", smsSent);

    res.status(201).json({
      message: "Запис успішно створено",
      appointment: appointmentData,
      notifications: {
        sms: smsSent,
      },
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Помилка при створенні запису",
      error: error.message,
    });
  }
});

export default router; 