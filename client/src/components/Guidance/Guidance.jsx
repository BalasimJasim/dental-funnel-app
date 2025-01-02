import PropTypes from "prop-types";
import { useState } from "react";
import Summary from "./Summary";
import styles from "./Guidance.module.css";

const QUESTIONS = [
  {
    id: 1,
    title: "Що вас найбільше турбує у вашій посмішці?",
    options: [
      {
        id: "pain",
        title: "Біль або Дискомфорт",
        subtext: "Негайна допомога при зубному болю",
      },
      {
        id: "missing",
        title: "Відсутні або Пошкоджені Зуби",
        subtext: "Відновіть повноцінну посмішку",
      },
      {
        id: "aesthetic",
        title: "Зовнішній Вигляд",
        subtext: "Покращіть естетику посмішки",
      },
      {
        id: "alignment",
        title: "Криві Зуби",
        subtext: "Досягніть ідеального вирівнювання",
      },
      {
        id: "prevention",
        title: "Профілактичний Догляд",
        subtext: "Підтримуйте здоров'я ротової порожнини",
      },
    ],
  },
  {
    id: 2,
    title: "Як давно ви відчуваєте ці проблеми?",
    options: [
      {
        id: "recent",
        title: "Нещодавно (до 1 тижня)",
        subtext: "Гострий біль або раптова проблема",
      },
      {
        id: "month",
        title: "Протягом місяця",
        subtext: "Періодичний дискомфорт",
      },
      {
        id: "several_months",
        title: "Кілька місяців",
        subtext: "Хронічна проблема",
      },
      {
        id: "year_plus",
        title: "Більше року",
        subtext: "Довготривала проблема",
      },
    ],
  },
  {
    id: 3,
    title: "Коли вам зручно відвідати стоматолога?",
    options: [
      {
        id: "urgent",
        title: "Якнайшвидше",
        subtext: "Терміновий запис",
      },
      {
        id: "this_week",
        title: "Цього тижня",
        subtext: "Планове лікування",
      },
      {
        id: "next_week",
        title: "Наступного тижня",
        subtext: "Зручний для вас час",
      },
      {
        id: "flexible",
        title: "Гнучкий графік",
        subtext: "Оберіть оптимальний час",
      },
    ],
  },
];

const Guidance = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = QUESTIONS[currentStep - 1];

  const handleOptionSelect = (optionId) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: optionId }));
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentStep < QUESTIONS.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowSummary(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleSummaryConfirm = () => {
    onComplete(answers);
  };

  const handleSummaryBack = () => {
    setShowSummary(false);
    setCurrentStep(QUESTIONS.length);
  };

  if (showSummary) {
    return (
      <Summary
        answers={answers}
        onConfirm={handleSummaryConfirm}
        onBack={handleSummaryBack}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            ← Назад
          </button>
          <div className={styles.progress}>
            <div className={styles.steps}>
              {Array.from({ length: QUESTIONS.length }, (_, i) => (
                <div
                  key={i}
                  className={`${styles.step} ${
                    i + 1 === currentStep ? styles.active : ""
                  } ${i + 1 < currentStep ? styles.completed : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className={styles.progressText}>
              Крок {currentStep} з {QUESTIONS.length}
            </div>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div
          className={`${styles.questionContent} ${
            isTransitioning ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <h2 className={styles.questionTitle}>{currentQuestion.title}</h2>

          <div className={styles.options}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                className={`${styles.optionButton} ${
                  answers[currentStep] === option.id ? styles.selected : ""
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                {option.title}
                <span className={styles.subtext}>{option.subtext}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Guidance.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Guidance;
