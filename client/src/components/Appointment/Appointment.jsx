import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { appointmentService } from '../../services/api.js';
import styles from './Appointment.module.css';
import { ukTranslations } from "../../translations/uk";
const { appointment } = ukTranslations;

const AVAILABLE_TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const formatPhoneDisplay = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // If starts with '0', keep it. Otherwise, add '0'
  let normalizedNumber = cleaned;
  if (!cleaned.startsWith("0")) {
    normalizedNumber = "0" + cleaned;
  }

  // Take only first 10 digits (including leading 0)
  normalizedNumber = normalizedNumber.slice(0, 10);

  // Format for display
  if (normalizedNumber.length <= 3) {
    return normalizedNumber;
  } else if (normalizedNumber.length <= 6) {
    return `(${normalizedNumber.slice(0, 3)}) ${normalizedNumber.slice(3)}`;
  } else {
    return `(${normalizedNumber.slice(0, 3)}) ${normalizedNumber.slice(
      3,
      6
    )}-${normalizedNumber.slice(6)}`;
  }
};

const formatPhoneForSubmission = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Ensure starts with 0 and has exactly 10 digits
  let normalizedNumber = cleaned;
  if (!cleaned.startsWith("0")) {
    normalizedNumber = "0" + cleaned;
  }

  // Return exactly 10 digits
  return normalizedNumber.slice(0, 10);
};

const Appointment = ({ onBack, onReturnHome }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [step, setStep] = useState(1);

  // Get min date (today)
  const minDate = new Date();

  // Get max date (set to a far future date)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 10); // Allow booking up to 10 years in advance

  // Custom function to check if a date should be disabled
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Disable weekends
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Format the display value as user types
    const formattedDisplay = formatPhoneDisplay(value);

    setFormData((prev) => ({
      ...prev,
      phone: formattedDisplay,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = selectedDate;

      const appointmentData = {
        date: formattedDate,
        time: selectedTime,
        patientInfo: {
          name: formData.name,
          email: formData.email,
          phone: formatPhoneForSubmission(formData.phone),
          notes: formData.notes,
        },
        serviceId: "cons-1",
      };

      const response = await appointmentService.bookAppointment(
        appointmentData
      );

      if (response.success) {
        setStep(4);
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Appointment booking error:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="appointment">
      <h2>{appointment.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{appointment.form.name}</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">{appointment.form.phone}</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="service">{appointment.form.service}</label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleChange("service", e.target.value)}
            required
          >
            <option value="">{appointment.form.service}</option>
            {Object.entries(appointment.services).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">{appointment.form.date}</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>{appointment.form.time}</label>
          <div className="time-slots">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={formData.time === slot ? "active" : ""}
                  onClick={() => handleChange("time", slot)}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>{appointment.noSlots}</p>
            )}
          </div>
        </div>

        <button type="submit">{appointment.form.submit}</button>
      </form>
    </div>
  );
};

export default Appointment; 