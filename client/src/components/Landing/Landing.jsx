import { useState } from 'react';
import styles from './Landing.module.css';
import { ukTranslations } from "../../translations/uk";
const { landing } = ukTranslations;

const Landing = ({ onStartGuidance }) => {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    {
      id: 1,
      title: "Доступні ціни",
      description: "Якісна стоматологічна допомога за розумною ціною",
      icon: "💰",
    },
    {
      id: 2,
      title: "Сучасне обладнання",
      description:
        "Використовуємо передові технології для найкращих результатів",
      icon: "🔧",
    },
    {
      id: 3,
      title: "Досвідчені лікарі",
      description: "Професійна допомога від кваліфікованих спеціалістів",
      icon: "👨‍⚕️",
    },
  ];

  const socialProof = [
    { id: 1, stat: "1000+", label: "Задоволених пацієнтів" },
    { id: 2, stat: "15+", label: "Років досвіду" },
    { id: 3, stat: "4.9/5", label: "Рейтинг пацієнтів" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{landing.title}</h1>
        <p className={styles.subtitle}>{landing.subtitle}</p>
        <div className={styles.ctaContainer}>
          <button
            className={`${styles.cta} ${isHovered ? styles.ctaHovered : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStartGuidance}
          >
            {landing.cta}
          </button>
          <p className={styles.ctaSubtext}>
            Безкоштовна консультація • Без зобов'язань
          </p>
        </div>
      </header>

      <section className={styles.socialProof}>
        {socialProof.map((item) => (
          <div key={item.id} className={styles.statItem}>
            <div className={styles.statNumber}>{item.stat}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </div>
        ))}
      </section>

      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Чому обирають нас?</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.id} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.urgencyBanner}>
        <p>Спеціальна пропозиція: Безкоштовна перша консультація</p>
        <button className={styles.secondaryCta} onClick={onStartGuidance}>
          {landing.guidanceButton} →
        </button>
      </section>
    </div>
  );
};

export default Landing; 