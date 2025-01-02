import { useState } from "react";
import styles from "./Landing.module.css";

// Add console log to verify styles are loaded
console.log("Landing styles:", styles);

const Landing = ({ onStartGuidance }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
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
