import { useState } from "react";
import styles from "./Landing.module.css";

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

      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Чому Обирають Нас?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>💰</div>
            <h3 className={styles.benefitTitle}>Доступні Ціни</h3>
            <p className={styles.benefitDescription}>
              Якісна стоматологічна допомога за розумною ціною
            </p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🔧</div>
            <h3 className={styles.benefitTitle}>Сучасне Обладнання</h3>
            <p className={styles.benefitDescription}>
              Використовуємо передові технології для найкращих результатів
            </p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>👨‍⚕️</div>
            <h3 className={styles.benefitTitle}>Досвідчені Лікарі</h3>
            <p className={styles.benefitDescription}>
              Професійна допомога від кваліфікованих спеціалістів
            </p>
          </div>
        </div>
      </section>

      <section className={styles.urgencyBanner}>
        <p>Спеціальна Пропозиція: Безкоштовна Перша Консультація</p>
        <button className={styles.secondaryCta} onClick={onStartGuidance}>
          Підібрати Послугу →
        </button>
      </section>
    </div>
  );
};

export default Landing;
