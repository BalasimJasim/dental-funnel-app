import { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import { CONTENT, DEFAULT_LANGUAGE } from "../../config/language";

const Landing = ({ onStartGuidance }) => {
  const [isHovered, setIsHovered] = useState(false);
  const content = CONTENT[DEFAULT_LANGUAGE].landing;

  useEffect(() => {
    // Debug log when component mounts
    console.log("[DEBUG] Landing mounted:", {
      hasContent: !!content,
      title: content?.title,
      language: DEFAULT_LANGUAGE,
    });
  }, [content]);

  if (!content) {
    console.error("[ERROR] Content not available in Landing");
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <div className={styles.ctaContainer}>
          <button
            className={`${styles.cta} ${isHovered ? styles.ctaHovered : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStartGuidance}
          >
            {content.cta}
          </button>
          <p className={styles.ctaSubtext}>
            {content.consultation} • {content.noObligation}
          </p>
        </div>
      </header>

      <section className={styles.socialProof}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {content.stats.patients.number}
          </div>
          <div className={styles.statLabel}>{content.stats.patients.label}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {content.stats.experience.number}
          </div>
          <div className={styles.statLabel}>
            {content.stats.experience.label}
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{content.stats.rating.number}</div>
          <div className={styles.statLabel}>{content.stats.rating.label}</div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
