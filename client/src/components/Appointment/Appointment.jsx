import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { appointmentService } from "../../services/api.js";
import styles from "./Appointment.module.css";
import PhoneInput from "../common/PhoneInput";
import SuccessModal from "../common/SuccessModal";
import { clinicardsService } from "../../services/clinicards";

const TREATMENTS = {
  pain: "Термінова допомога при болю",
  missing: "Протезування зубів",
  aesthetic: "Естетична стоматологія",
  alignment: "Ортодонтія",
  prevention: "Профілактичний огляд",
};

const Appointment = ({ onBack, assessmentAnswers }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: assessmentAnswers ? TREATMENTS[assessmentAnswers[1]] : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Generate available times based on assessment
  const getAvailableTimes = () => {
    const isUrgent =
      assessmentAnswers &&
      (assessmentAnswers[1] === "pain" || assessmentAnswers[2] === "recent");

    if (isUrgent) {
      return [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
      ];
    }

    return [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (formData.name.trim().length < 2) {
      errors.name = "Ім'я повинно містити мінімум 2 символи";
    }

    // Phone validation
    const phoneRegex = /^\+380 \d{2} \d{3} \d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Введіть коректний номер телефону";
    }

    // Date validation
    if (!selectedDate) {
      errors.date = "Оберіть дату";
    }

    // Time validation
    if (!selectedTime) {
      errors.time = "Оберіть час";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const appointmentData = {
        date: selectedDate,
        time: selectedTime,
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        assessmentAnswers,
      };

      const response = await appointmentService.create(appointmentData);

      // Check if SMS was sent
      if (response.notifications?.sms === false) {
        console.warn("SMS notification failed to send");
        // You might want to show a warning to the user
      }

      setAppointmentDetails({
        date: selectedDate,
        time: selectedTime,
        service:
          formData.service ||
          TREATMENTS[assessmentAnswers[1]] ||
          "Консультація",
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Помилка при створенні запису:", error);
      setSubmitError(
        error.message || "Помилка при записі. Будь ласка, спробуйте ще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch available slots when date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate) return;

      setIsLoadingSlots(true);
      try {
        const slots = await clinicardsService.getAvailableSlots(
          selectedDate.toISOString()
        );
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setFormErrors((prev) => ({
          ...prev,
          time: "Помилка завантаження доступного часу",
        }));
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Назад
      </button>

      <h2 className={styles.title}>Запис на прийом</h2>

      {assessmentAnswers && (
        <div className={styles.assessment}>
          <h3>Рекомендований план</h3>
          <p>{TREATMENTS[assessmentAnswers[1]]}</p>
        </div>
      )}

      {submitError && <div className={styles.error}>{submitError}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (formErrors.name) {
                setFormErrors({ ...formErrors, name: "" });
              }
            }}
            placeholder="Введіть ваше ім'я"
            className={formErrors.name ? styles.invalid : ""}
          />
          {formErrors.name && (
            <span className={styles.errorText}>{formErrors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Телефон</label>
          <PhoneInput
            value={formData.phone}
            onChange={(value) => {
              setFormData({ ...formData, phone: value });
              if (formErrors.phone) {
                setFormErrors({ ...formErrors, phone: "" });
              }
            }}
            required
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
          {isLoadingSlots ? (
            <div className={styles.loading}>
              Завантаження доступного часу...
            </div>
          ) : (
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              disabled={!selectedDate || isLoadingSlots}
            >
              <option value="">Оберіть час</option>
              {availableSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          )}
          {formErrors.time && (
            <span className={styles.errorText}>{formErrors.time}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Обробка..." : "Записатися"}
        </button>
      </form>

      {showSuccessModal && (
        <SuccessModal
          appointmentDetails={appointmentDetails}
          onClose={() => {
            setShowSuccessModal(false);
            onBack();
          }}
        />
      )}
    </div>
  );
};

Appointment.propTypes = {
  onBack: PropTypes.func.isRequired,
  assessmentAnswers: PropTypes.objectOf(PropTypes.string),
};

export default Appointment;
