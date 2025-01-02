import { useState } from "react";
import styles from "./Guidance.module.css";

const Guidance = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            ← Назад
          </button>
          <div className={styles.progress}>Крок {currentStep} з 3</div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <h2 className={styles.questionTitle}>
          Що вас найбільше турбує у вашій посмішці?
        </h2>

        <div className={styles.options}>
          <button className={styles.optionButton}>
            Біль або Дискомфорт
            <span className={styles.subtext}>
              Негайна допомога при зубному болю
            </span>
          </button>

          <button className={styles.optionButton}>
            Відсутні або Пошкоджені Зуби
            <span className={styles.subtext}>
              Відновіть повноцінну посмішку
            </span>
          </button>

          <button className={styles.optionButton}>
            Зовнішній Вигляд
            <span className={styles.subtext}>Покращіть естетику посмішки</span>
          </button>

          <button className={styles.optionButton}>
            Криві Зуби
            <span className={styles.subtext}>
              Досягніть ідеального вирівнювання
            </span>
          </button>

          <button className={styles.optionButton}>
            Профілактичний Догляд
            <span className={styles.subtext}>
              Підтримуйте здоров'я ротової порожнини
            </span>
          </button>
        </div>

        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            ← Назад
          </button>
          <button
            className={styles.navButton}
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Пропустити →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guidance;
