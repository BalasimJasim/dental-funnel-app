import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Landing.module.css";

const Landing = ({ onStartGuidance }) => {
  const [showEmergency, setShowEmergency] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.emergencyBanner}>
        <button
          className={styles.emergencyToggle}
          onClick={() => setShowEmergency(!showEmergency)}
        >
          <span className={styles.emergencyIcon}>🚨</span>
          Потрібна термінова допомога?
        </button>
        {showEmergency && (
          <div className={styles.emergencyInfo}>
            <h3>Термінова стоматологічна допомога</h3>
            <p>
              Ми розуміємо, що зубний біль не може чекати. Зателефонуйте нам
              прямо зараз:
            </p>
            <a href="tel:+380123456789">+38 (012) 345-67-89</a>
          </div>
        )}
      </div>

      <div className={styles.hero}>
        <h1 className={styles.title}>Перетворіть Вашу Посмішку Сьогодні</h1>
        <p className={styles.subtitle}>
          Отримайте індивідуальний план лікування за 3 простих кроки
        </p>
      </div>

      <div className={styles.ctaContainer}>
        <button onClick={onStartGuidance} className={styles.cta}>
          Знайти Ідеальне Рішення
        </button>
        <p className={styles.ctaSubtext}>
          Безкоштовна консультація • Без зобов'язань
        </p>
      </div>

      <div className={styles.socialProof}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>1000+</div>
          <div className={styles.statLabel}>Задоволених Пацієнтів</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>15+</div>
          <div className={styles.statLabel}>Років Досвіду</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>4.9/5</div>
          <div className={styles.statLabel}>Рейтинг Пацієнтів</div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  onStartGuidance: PropTypes.func.isRequired,
};

export default Landing;
