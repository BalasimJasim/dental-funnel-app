import PropTypes from "prop-types";
import { useState } from "react";
import Summary from "./Summary";
import styles from "./Guidance.module.css";

const QUESTIONS = {
  1: {
    title: "Що вас найбільше турбує у вашій посмішці?",
    options: [
      {
        id: "missing_one",
        title: "Відсутній один зуб",
        subtext: "Імплант або міст на сусідніх зубах",
      },
      {
        id: "missing_multiple",
        title: "Відсутні декілька зубів",
        subtext: "Імпланти, міст або частковий протез",
      },
      {
        id: "missing_all",
        title: "Повна відсутність зубів",
        subtext: "All-on-X або повний знімний протез",
      },
      {
        id: "pain",
        title: "Біль або Дискомфорт",
        subtext: "Негайна допомога при зубному болю",
      },
    ],
  },

  // Questions for single missing tooth
  missing_one: {
    title: "Як давно відсутній зуб?",
    options: [
      {
        id: "recent_loss",
        title: "Нещодавно втратив",
        subtext: "Можливість негайної імплантації",
      },
      {
        id: "months_ago",
        title: "Кілька місяців тому",
        subtext: "Стандартна імплантація",
      },
      {
        id: "years_ago",
        title: "Більше року",
        subtext: "Можлива потреба в нарощуванні кістки",
      },
    ],
  },

  // Questions for multiple missing teeth
  missing_multiple: {
    title: "Які зуби відсутні?",
    options: [
      {
        id: "front_teeth",
        title: "Передні зуби",
        subtext: "Естетично важлива зона",
      },
      {
        id: "back_teeth",
        title: "Жувальні зуби",
        subtext: "Відновлення жувальної функції",
      },
      {
        id: "mixed",
        title: "Різні ділянки",
        subtext: "Комплексне відновлення",
      },
    ],
  },

  // Questions for complete tooth loss
  missing_all: {
    title: "Що для вас найважливіше?",
    options: [
      {
        id: "fixed_solution",
        title: "Незнімна конструкція",
        subtext: "All-on-X імплантація",
      },
      {
        id: "removable",
        title: "Знімний протез",
        subtext: "Класичне знімне протезування",
      },
      {
        id: "affordable",
        title: "Доступна ціна",
        subtext: "Економ варіанти протезування",
      },
    ],
  },

  // Questions for pain/discomfort
  pain: {
    title: "Характер болю?",
    options: [
      {
        id: "acute_pain",
        title: "Гострий біль",
        subtext: "Потрібна термінова допомога",
      },
      {
        id: "chronic_pain",
        title: "Хронічний біль",
        subtext: "Планове лікування",
      },
      {
        id: "sensitivity",
        title: "Чутливість",
        subtext: "Діагностика та профілактика",
      },
    ],
  },
};

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

const STEP_TITLES = [
  "Що вас найбільше турбує у вашій посмішці?",
  "Як давно у вас ця проблема?",
  "Що для вас найважливіше у лікуванні?",
];

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

    // Add a small delay for animation
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

  const renderStepTitles = () => {
    return (
      <div className={styles.stepTitles}>
        {STEP_TITLES.map((title, index) => (
          <div
            key={index}
            className={`${styles.stepTitle} ${
              currentStep === index + 1 ? styles.activeTitle : ""
            }`}
          >
            {title}
          </div>
        ))}
      </div>
    );
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
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className={styles.questionContent}>
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


