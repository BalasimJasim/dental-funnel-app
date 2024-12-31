import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  patientInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    notes: String
  },
  serviceId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'cancelled', 'completed'],
    default: 'scheduled'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Appointment', AppointmentSchema); 