import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { appointmentService } from "../../services/api.js";
import styles from "./Appointment.module.css";

const Appointment = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.create({
        date: selectedDate,
        time: selectedTime,
        ...formData,
      });
      alert("Дякуємо за запис! Ми зв'яжемося з вами найближчим часом.");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Помилка при записі. Будь ласка, спробуйте ще раз.");
    }
  };

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const services = [
    "Консультація",
    "Професійна чистка",
    "Пломбування",
    "Відбілювання",
    "Лікування карієсу",
    "Видалення зуба",
  ];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Назад
      </button>

      <h2 className={styles.title}>Запис на прийом</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Введіть ваше ім'я"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+380"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Оберіть дату</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="Оберіть дату"
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Оберіть час</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          >
            <option value="">Оберіть час</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Оберіть послугу</label>
          <select
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            required
          >
            <option value="">Оберіть послугу</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Записатися
        </button>
      </form>
    </div>
  );
};

export default Appointment;
