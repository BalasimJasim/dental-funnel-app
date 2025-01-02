import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./PhoneInput.module.css";

const PhoneInput = ({ value, onChange, required = false }) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const formatPhoneNumber = (input) => {
    // Remove all non-digit characters
    const numbers = input.replace(/\D/g, "");

    // Format as +380 XX XXX XXXX
    if (numbers.length === 0) return "";
    if (numbers.length <= 3) return `+${numbers}`;
    if (numbers.length <= 5)
      return `+${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    if (numbers.length <= 8)
      return `+${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(
        5
      )}`;
    return `+${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(
      5,
      8
    )} ${numbers.slice(8, 12)}`;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    onChange(formatted);
  };

  useEffect(() => {
    // Validate phone number format
    const phoneRegex = /^\+380 \d{2} \d{3} \d{4}$/;
    setIsValid(value === "" || phoneRegex.test(value));
  }, [value]);

  return (
    <div className={styles.phoneInputWrapper}>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="+380"
        required={required}
        className={`${styles.phoneInput} ${!isValid ? styles.invalid : ""} ${
          focused ? styles.focused : ""
        }`}
      />
      {!isValid && (
        <span className={styles.error}>
          Введіть коректний номер телефону: +380 XX XXX XXXX
        </span>
      )}
    </div>
  );
};

PhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default PhoneInput;
