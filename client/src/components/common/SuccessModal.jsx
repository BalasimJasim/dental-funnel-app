import PropTypes from "prop-types";
import styles from "./SuccessModal.module.css";

const SuccessModal = ({ onClose, appointmentDetails }) => {
  const { date, time, service = "Консультація" } = appointmentDetails;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>✓</div>
        <h2>Запис Підтверджено!</h2>
        <div className={styles.details}>
          <p>
            <strong>Дата:</strong> {date.toLocaleDateString("uk-UA")}
          </p>
          <p>
            <strong>Час:</strong> {time}
          </p>
          <p>
            <strong>Послуга:</strong> {service}
          </p>
        </div>
        <p className={styles.message}>
          Ми надішлемо вам SMS-підтвердження. Очікуйте дзвінка від нашого
          адміністратора.
        </p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.button}>
            Зрозуміло
          </button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  appointmentDetails: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    time: PropTypes.string.isRequired,
    service: PropTypes.string,
  }).isRequired,
};

export default SuccessModal;