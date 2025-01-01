import { useState } from 'react';
import styles from './Landing.module.css';
import { useTranslations } from "../../context/LanguageContext";

const Landing = ({ onStartGuidance }) => {
  console.log("DEPLOYMENT: Landing component mounting");
  const translations = useTranslations();
  const { landing } = translations;

  // Add deployment check
  if (import.meta.env.MODE === "production") {
    console.log("DEPLOYMENT: Landing translations:", {
      hasTranslations: !!landing,
      mainTitle: landing?.mainTitle,
    });
  }

  const [isHovered, setIsHovered] = useState(false);

  // Add error boundary for missing translations
  if (!landing) {
    console.error("DEPLOYMENT: Landing translations missing!");
    return <div>Loading translations...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{landing.mainTitle}</h1>
        <p className={styles.subtitle}>{landing.mainSubtitle}</p>
        <div className={styles.ctaContainer}>
          <button
            className={`${styles.cta} ${isHovered ? styles.ctaHovered : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStartGuidance}
          >
            {landing.findSolution}
          </button>
          <p className={styles.ctaSubtext}>
            {landing.consultation} • {landing.noObligation}
          </p>
        </div>
      </header>

      <section className={styles.socialProof}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {landing.stats.patients.number}
          </div>
          <div className={styles.statLabel}>{landing.stats.patients.label}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {landing.stats.experience.number}
          </div>
          <div className={styles.statLabel}>
            {landing.stats.experience.label}
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{landing.stats.rating.number}</div>
          <div className={styles.statLabel}>{landing.stats.rating.label}</div>
        </div>
      </section>

      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>{landing.benefits.title}</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>💰</div>
            <h3 className={styles.benefitTitle}>
              {landing.benefits.items.prices.title}
            </h3>
            <p className={styles.benefitDescription}>
              {landing.benefits.items.prices.description}
            </p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🔧</div>
            <h3 className={styles.benefitTitle}>
              {landing.benefits.items.equipment.title}
            </h3>
            <p className={styles.benefitDescription}>
              {landing.benefits.items.equipment.description}
            </p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>👨‍⚕️</div>
            <h3 className={styles.benefitTitle}>
              {landing.benefits.items.doctors.title}
            </h3>
            <p className={styles.benefitDescription}>
              {landing.benefits.items.doctors.description}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.urgencyBanner}>
        <p>{landing.specialOffer.title}</p>
        <button className={styles.secondaryCta} onClick={onStartGuidance}>
          {landing.specialOffer.button} →
        </button>
      </section>
    </div>
  );
};

export default Landing; 