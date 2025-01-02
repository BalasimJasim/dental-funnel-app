import { useState } from "react";
import styles from "./Landing.module.css";

// Add console log to verify styles are loaded
console.log("Landing styles:", styles);

const Landing = ({ onStartGuidance }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);

  return (
    <div className={styles.container}>
      {/* Emergency Banner */}
      <div className={styles.emergencyBanner}>
        <button
          className={styles.emergencyToggle}
          onClick={() => setIsEmergency(!isEmergency)}
        >
          🚨 Потрібна термінова допомога?
        </button>
        {isEmergency && (
          <div className={styles.emergencyInfo}>
            <h3>Невідкладна допомога</h3>
            <p>
              Телефонуйте зараз:{" "}
              <a href="tel:+380123456789">+38 (012) 345-67-89</a>
            </p>
            <p>Ми готові допомогти 24/7</p>
          </div>
        )}
      </div>

      <header className={styles.hero}>
        <h1 className={styles.title}>Перетворіть Вашу Посмішку Сьогодні</h1>
        <p className={styles.subtitle}>
          Отримайте індивідуальний план лікування за 3 простих кроки
        </p>
        <div className={styles.ctaContainer}>
          <button
            className={`${styles.cta} ${isHovered ? styles.ctaHovered : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStartGuidance}
          >
            Знайти Ідеальне Рішення
          </button>
          <p className={styles.ctaSubtext}>
            Безкоштовна консультація • Без зобов'язань
          </p>
        </div>
      </header>

      {/* Trust Indicators */}
      <section className={styles.trustIndicators}>
        <div className={styles.indicator}>✓ Сучасне обладнання</div>
        <div className={styles.indicator}>✓ Досвідчені спеціалісти</div>
        <div className={styles.indicator}>✓ Безболісне лікування</div>
      </section>

      <section className={styles.socialProof}>
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
      </section>
    </div>
  );
};

export default Landing;
