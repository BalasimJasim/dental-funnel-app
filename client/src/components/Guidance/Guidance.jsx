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
        id: "missing_single",
        title: "Відсутній один зуб",
        subtext: "Імплант або міст на сусідніх зубах",
        priority: "high",
      },
      {
        id: "missing_multiple",
        title: "Відсутні декілька зубів",
        subtext: "Імпланти, міст або частковий протез",
        priority: "high",
      },
      {
        id: "full_jaw",
        title: "Повна відсутність зубів",
        subtext: "All-on-X або повний знімний протез",
        priority: "high",
      },
      {
        id: "bridge_option",
        title: "Потрібен міст на зубах",
        subtext: "Відновлення зубів без імплантації",
        priority: "medium",
      },
      {
        id: "denture_option",
        title: "Потрібен знімний протез",
        subtext: "Класичне знімне протезування",
        priority: "medium",
      },
      {
        id: "unstable_denture",
        title: "Незручний знімний протез",
        subtext: "Покращення фіксації протеза",
        priority: "medium",
      },
      {
        id: "pain",
        title: "Біль або Дискомфорт",
        subtext: "Негайна допомога при зубному болю",
        priority: "high",
      },
      {
        id: "aesthetic",
        title: "Естетичні проблеми",
        subtext: "Покращення зовнішнього вигляду",
        priority: "low",
      },
    ],
  },
  {
    id: 2,
    title: "Як давно у вас ця проблема?",
    options: [
      {
        id: "recent",
        title: "Нещодавно втратив зуб",
        subtext: "Можливість негайної імплантації",
      },
      {
        id: "months",
        title: "Кілька місяців",
        subtext: "Оптимальний час для імплантації",
      },
      {
        id: "years",
        title: "Більше року",
        subtext: "Можлива потреба в нарощуванні кістки",
      },
      {
        id: "long_term",
        title: "Багато років",
        subtext: "Комплексне відновлення",
      },
    ],
    showFor: [
      "missing_single",
      "missing_multiple",
      "full_jaw",
      "unstable_denture",
    ],
  },
  {
    id: 3,
    title: "Що для вас найважливіше у лікуванні?",
    options: [
      {
        id: "quality",
        title: "Якість і Довговічність",
        subtext: "Преміум імпланти з гарантією",
      },
      {
        id: "speed",
        title: "Швидкість лікування",
        subtext: "Протокол негайного навантаження",
      },
      {
        id: "comfort",
        title: "Комфорт лікування",
        subtext: "Седація та безболісні процедури",
      },
      {
        id: "price",
        title: "Доступна ціна",
        subtext: "Економ варіанти та розстрочка",
      },
    ],
    showFor: [
      "missing_single",
      "missing_multiple",
      "full_jaw",
      "unstable_denture",
    ],
  },
];

// Add treatment recommendations based on answers
const TREATMENT_RECOMMENDATIONS = {
  missing_single: {
    title: "Одиночний імплант",
    description:
      "Найсучасніший метод відновлення одного зуба. Імплант виглядає і функціонує як природний зуб.",
    benefits: [
      "Не пошкоджує сусідні зуби",
      "Запобігає втраті кісткової тканини",
      "Термін служби 15-20+ років",
      "Природний вигляд і відчуття",
    ],
  },
  missing_multiple: {
    title: "Міст на імплантах",
    description:
      "Ідеальне рішення для відновлення декількох зубів підряд. Не потребує обточування сусідніх зубів.",
    benefits: [
      "Відновлення декількох зубів на 2-4 імплантах",
      "Фіксована конструкція",
      "Природна жувальна функція",
      "Довготривалий результат",
    ],
  },
  full_jaw: {
    title: "All-on-X",
    description:
      "Повна реконструкція щелепи на 4-6 імплантах. Фіксований протез, що виглядає як природні зуби.",
    benefits: [
      "Повне відновлення за 1-2 дні",
      "Фіксована конструкція",
      "Природний вигляд",
      "Відновлення до 90% жувальної функції",
    ],
  },
  unstable_denture: {
    title: "Протез на імплантах",
    description:
      "Стабілізація знімного протеза на 2-4 імплантах. Значно покращує комфорт і функціональність.",
    benefits: [
      "Надійна фіксація протеза",
      "Можливість зняття для чищення",
      "Доступна вартість",
      "Покращена жувальна функція",
    ],
  },
  bridge_option: {
    title: "Зубний міст",
    description:
      "Класичний метод відновлення зубів з опорою на сусідні зуби. Економічно вигідне рішення без імплантації.",
    benefits: [
      "Швидке відновлення зубного ряду",
      "Нижча вартість порівняно з імплантами",
      "Перевірена часом методика",
      "Естетичний результат",
    ],
  },
  denture_option: {
    title: "Знімний протез",
    description:
      "Традиційний знімний протез для відновлення втрачених зубів. Доступне рішення для відновлення посмішки.",
    benefits: [
      "Найбільш економічний варіант",
      "Можливість швидкого виготовлення",
      "Легке очищення та догляд",
      "Можливість подальшої модифікації",
    ],
  },
};

const Guidance = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = QUESTIONS[currentStep - 1];

  const handleStepBack = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      onBack();
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(stepNumber);
        setIsTransitioning(false);
      }, 300);
    }
  };

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
          <button
            className={styles.backButton}
            onClick={handleStepBack}
            aria-label="Повернутися назад"
          >
            ← {currentStep === 1 ? "Назад" : "Попереднє питання"}
          </button>
          <div className={styles.progress}>
            <div className={styles.steps}>
              {Array.from({ length: QUESTIONS.length }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleStepClick(i + 1)}
                  className={`${styles.step} ${
                    i + 1 === currentStep ? styles.active : ""
                  } ${i + 1 < currentStep ? styles.completed : ""}`}
                  disabled={i + 1 > currentStep}
                  aria-label={`Крок ${i + 1}`}
                  title={QUESTIONS[i].title}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className={styles.progressText}>
              Крок {currentStep} з {QUESTIONS.length}
            </div>
          </div>
        </div>

        <div className={styles.stepTitles}>
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className={`${styles.stepTitle} ${
                i + 1 === currentStep ? styles.activeTitle : ""
              }`}
            >
              {q.title}
            </div>
          ))}
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className={styles.navigation}>
          {currentStep > 1 && (
            <button
              className={styles.navButton}
              onClick={handleStepBack}
              aria-label="Попереднє питання"
            >
              ← Назад
            </button>
          )}
          {answers[currentStep] && currentStep < QUESTIONS.length && (
            <button
              className={styles.navButton}
              onClick={() => handleOptionSelect(answers[currentStep])}
              aria-label="Наступне питання"
            >
              Далі →
            </button>
          )}
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
