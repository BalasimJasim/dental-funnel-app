import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { appointmentService } from '../../services/api.js';
import styles from './Appointment.module.css';

const AVAILABLE_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const formatPhoneDisplay = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // If starts with '0', keep it. Otherwise, add '0'
  let normalizedNumber = cleaned;
  if (!cleaned.startsWith('0')) {
    normalizedNumber = '0' + cleaned;
  }
  
  // Take only first 10 digits (including leading 0)
  normalizedNumber = normalizedNumber.slice(0, 10);
  
  // Format for display
  if (normalizedNumber.length <= 3) {
    return normalizedNumber;
  } else if (normalizedNumber.length <= 6) {
    return `(${normalizedNumber.slice(0, 3)}) ${normalizedNumber.slice(3)}`;
  } else {
    return `(${normalizedNumber.slice(0, 3)}) ${normalizedNumber.slice(3, 6)}-${normalizedNumber.slice(6)}`;
  }
};

const formatPhoneForSubmission = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Ensure starts with 0 and has exactly 10 digits
  let normalizedNumber = cleaned;
  if (!cleaned.startsWith('0')) {
    normalizedNumber = '0' + cleaned;
  }
  
  // Return exactly 10 digits
  return normalizedNumber.slice(0, 10);
};

const Appointment = ({ onBack, onReturnHome }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
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
    setSelectedDate(date.toISOString().split('T')[0]);
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Format the display value as user types
    const formattedDisplay = formatPhoneDisplay(value);
    
    setFormData(prev => ({
      ...prev,
      phone: formattedDisplay
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
          notes: formData.notes
        },
        serviceId: 'cons-1'
      };

      const response = await appointmentService.bookAppointment(appointmentData);

      if (response.success) {
        setStep(4);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Appointment booking error:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.appointmentCard}>
        <div className={styles.header}>
          <div className={styles.navigationTop}>
            <button 
              className={styles.backButton}
              onClick={onBack}
            >
              ← Back
            </button>
            <button 
              className={styles.homeButton}
              onClick={onReturnHome}
            >
              Home
            </button>
          </div>
          <div className={styles.progress}>
            Step {step} of 4
          </div>
        </div>

        {step === 1 && (
          <div className={styles.dateSelection}>
            <h2>Select a Date</h2>
            <div className={styles.datePickerWrapper}>
              <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                filterDate={isWeekday}
                inline
                calendarClassName={styles.calendar}
                dayClassName={date => 
                  date.toISOString().split('T')[0] === selectedDate
                    ? styles.selectedDay
                    : undefined
                }
                monthClassName={styles.month}
                weekDayClassName={styles.weekDay}
                fixedHeight
                showPopperArrow={false}
                placeholderText="Select a date"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.timeSelection}>
            <h2>Select a Time</h2>
            <div className={styles.timeGrid}>
              {AVAILABLE_TIMES.map((time) => (
                <button
                  key={time}
                  className={`${styles.timeButton} ${selectedTime === time ? styles.selected : ''}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.contactForm}>
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className={styles.input}
                  placeholder="(093) 647-0394"
                  pattern="\(\d{3}\)\s\d{3}-\d{4}"
                  title="Please enter a valid Ukrainian phone number starting with 0"
                />
                <small className={styles.hint}>
                  Format: (093) 647-0394
                </small>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows="4"
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Confirm Appointment
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className={styles.confirmation}>
            <h2>Appointment Confirmed!</h2>
            <div className={styles.confirmationDetails}>
              <p className={styles.appointmentTime}>
                <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>
              </p>
              <div className={styles.nextSteps}>
                <h3>What to Expect Next:</h3>
                <ul>
                  <li>✓ Confirmation email sent to {formData.email}</li>
                  <li>✓ SMS confirmation sent to {formData.phone}</li>
                  <li>• SMS reminder 24 hours before appointment</li>
                  <li>• Free parking available on-site</li>
                  <li>• Please arrive 10 minutes early</li>
                </ul>
              </div>
              <div className={styles.preparation}>
                <h3>Preparation Tips:</h3>
                <ul>
                  <li>• Bring your ID and insurance card (if applicable)</li>
                  <li>• List of current medications</li>
                  <li>• Recent dental X-rays (if available)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment; 