import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { appointmentService } from '../../services/api.js';
import styles from './Appointment.module.css';
import { useTranslations } from "../../context/LanguageContext";

const Appointment = ({ onBack }) => {
  const translations = useTranslations();
  const { appointment } = translations;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  // ... rest of your state and handlers

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const availableSlots = AVAILABLE_TIMES; // You might want to fetch this dynamically

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{appointment.title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ... rest of your JSX */}
      </form>
    </div>
  );
};

export default Appointment; 