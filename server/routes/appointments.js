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

    // Here you would typically save to database
    // For now, we'll just simulate a successful response

    res.status(201).json({
      message: "Запис успішно створено",
      appointment: appointmentData,
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