import { useState } from 'react';
import styles from './Guidance.module.css';
import { ukTranslations } from "../../translations/uk";
const { guidance } = ukTranslations;

const questions = [
  {
    id: 1,
    text: "Що вас найбільше турбує у вашій посмішці?",
    options: [
      {
        id: "b1",
        text: "Біль або дискомфорт",
        subtext: "Негайна допомога при зубному болю",
      },
      {
        id: "a2",
        text: "Відсутні або пошкоджені зуби",
        subtext: "Відновіть повноцінну посмішку",
      },
      {
        id: "a3",
        text: "Зовнішній вигляд",
        subtext: "Покращіть естетику посмішки",
      },
      {
        id: "a4",
        text: "Криві зуби",
        subtext: "Досягніть ідеального вирівнювання",
      },
      {
        id: "a5",
        text: "Профілактичний догляд",
        subtext: "Підтримуйте оптимальне здоров'я ротової порожнини",
      },
    ],
  },
  {
    id: 2,
    text: "Розкажіть детальніше про вашу проблему:",
    options: [], // Will be populated dynamically
  },
  {
    id: 3,
    text: "Чи проходили ви раніше лікування з цього приводу?",
    options: [
      { id: "c1", text: "Так, нещодавно (протягом останніх 6 місяців)" },
      { id: "c2", text: "Так, але давно" },
      { id: "c3", text: "Ні, вперше" },
      { id: "c4", text: "Не впевнений, потрібна консультація" },
    ],
  },
];

const Guidance = ({ onComplete, onBack, onReturnHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const getSecondQuestionOptions = () => {
    switch (answers[1]) {
      case "a1":
        return [
          { id: "b1", text: "Регулярний огляд та чистка" },
          { id: "b2", text: "Глибока чистка" },
          { id: "b3", text: "Перевірка на карієс" },
          { id: "b4", text: "Загальна консультація" },
        ];
      case "a2":
        return [
          { id: "b5", text: "Зубний біль" },
          { id: "b6", text: "Проблеми з яснами" },
          { id: "b7", text: "Біль після пломбування каналу" },
          { id: "b8", text: "Нічне скрегетіння/біль в щелепі" },
        ];
      case "a3":
        return [
          { id: "b9", text: "Відбілювання зубів" },
          { id: "b10", text: "Вініри або бондинг" },
          { id: "b11", text: "Перетворення посмішки" },
          { id: "b12", text: "Виправлення сколотих або зламаних зубів" },
        ];
      case "a4":
        return [
          { id: "b13", text: "Заміна одного зуба" },
          { id: "b14", text: "Заміна декількох зубів" },
          { id: "b15", text: "Повна заміна зубного ряду" },
          { id: "b16", text: "Зубні протези" },
        ];
      case "a5":
        return [
          { id: "b17", text: "Традиційні брекети" },
          { id: "b18", text: "Прозорі елайнери" },
          { id: "b19", text: "Дитяча ортодонтія" },
          { id: "b20", text: "Ретейнери" },
        ];
      default:
        return [];
    }
  };

  const handleAnswer = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetGuidance = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendation = () => {
    const firstAnswer = answers[1];

    if (firstAnswer === "a1") {
      return {
        service: "Консультація та професійна чистка",
        description:
          "Наш комплексний огляд включає професійну чистку, детальне обстеження та персональні рекомендації по догляду за ротовою порожниною.",
        estimatedCost: "1000 - 2000 грн",
        category: "Профілактична стоматологія",
        details: [
          "Професійна чистка зубів",
          "Цифрова рентгенографія за потреби",
          "Скринінг на рак ротової порожнини",
          "Персональний план догляду",
        ],
        urgency: getUrgencyLevel(answers),
        availability: "Limited slots this week",
        specialOffer: getSpecialOffer(answers),
        nextSteps: [
          "Book your consultation now",
          "Meet our specialist team",
          "Get your personalized treatment plan",
          "Start your journey to a perfect smile",
        ],
      };
    } else if (firstAnswer === "a2") {
      return {
        service: "Невідкладна стоматологічна допомога",
        description:
          "Ми надаємо швидку допомогу при зубному болю з повною діагностикою та варіантами лікування.",
        estimatedCost: "1500 - 8000 грн",
        category: "Терапевтична стоматологія",
        details: [
          "Невідкладний прийом в той же день",
          "Зняття болю",
          "Лікування каналів за потреби",
          "План подальшого догляду",
        ],
        urgency: getUrgencyLevel(answers),
        availability: "Доступні місця на цьому тижні",
        specialOffer: getSpecialOffer(answers),
        nextSteps: [
          "Записатися на консультацію зараз",
          "Зустріч з нашими спеціалістами",
          "Отримати персональний план лікування",
          "Почати шлях до ідеальної посмішки",
        ],
      };
    } else if (firstAnswer === "a3") {
      return {
        service: "Консультація з естетичної стоматології",
        description:
          "Перетворіть свою посмішку за допомогою сучасних косметичних процедур.",
        estimatedCost: "5000 - 30000 грн",
        category: "Естетична стоматологія",
        details: [
          "Цифрове моделювання посмішки",
          "Варіанти відбілювання",
          "Консультація по вінірах",
          "Варіанти оплати",
        ],
        urgency: getUrgencyLevel(answers),
        availability: "Limited slots this week",
        specialOffer: getSpecialOffer(answers),
        nextSteps: [
          "Book your consultation now",
          "Meet our specialist team",
          "Get your personalized treatment plan",
          "Start your journey to a perfect smile",
        ],
      };
    } else if (firstAnswer === "a4") {
      return {
        service: "Dental Implant Consultation",
        description:
          "Restore your smile with permanent, natural-looking tooth replacement options.",
        estimatedCost: "$3000 - $6000",
        category: "Dental Surgery",
        details: [
          "3D imaging consultation",
          "Implant options review",
          "Treatment timeline",
          "Financing options",
        ],
        urgency: getUrgencyLevel(answers),
        availability: "Limited slots this week",
        specialOffer: getSpecialOffer(answers),
        nextSteps: [
          "Book your consultation now",
          "Meet our specialist team",
          "Get your personalized treatment plan",
          "Start your journey to a perfect smile",
        ],
      };
    } else {
      return {
        service: "Orthodontic Consultation",
        description:
          "Achieve a perfectly aligned smile with our modern orthodontic solutions.",
        estimatedCost: "$2500 - $6000",
        category: "Orthodontics",
        details: [
          "Digital smile simulation",
          "Treatment options comparison",
          "Timeline estimation",
          "Insurance verification",
        ],
        urgency: getUrgencyLevel(answers),
        availability: "Limited slots this week",
        specialOffer: getSpecialOffer(answers),
        nextSteps: [
          "Book your consultation now",
          "Meet our specialist team",
          "Get your personalized treatment plan",
          "Start your journey to a perfect smile",
        ],
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the appointment data to your backend
    console.log({
      date: selectedDate,
      time: selectedTime,
      ...formData,
    });

    // Move to appointment booking
    onComplete();
  };

  if (showResults) {
    const recommendation = getRecommendation();
    return (
      <div className={styles.container}>
        <div className={styles.results}>
          <h2 className={styles.resultTitle}>Рекомендоване лікування</h2>
          <div className={styles.recommendationCard}>
            <h3>{recommendation.service}</h3>
            <p className={styles.category}>
              Категорія: {recommendation.category}
            </p>
            <p className={styles.description}>{recommendation.description}</p>
            <div className={styles.details}>
              <h4>Що включено:</h4>
              <ul>
                {recommendation.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <p className={styles.estimatedCost}>
              Орієнтовна вартість: {recommendation.estimatedCost}
            </p>
            <div className={styles.navigationButtons}>
              <button
                className={`${styles.actionButton} ${styles.secondaryButton}`}
                onClick={() => setShowResults(false)}
              >
                {guidance.back}
              </button>
              <button className={styles.actionButton} onClick={onComplete}>
                Записатись на консультацію
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dynamically set options for second question
  if (currentQuestion === 1) {
    questions[1].options = getSecondQuestionOptions();
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <div className={styles.header}>
          <div className={styles.navigationTop}>
            <button className={styles.backButton} onClick={onBack}>
              ← {guidance.back}
            </button>
            <div className={styles.progress}>
              Крок {currentQuestion + 1} з {questions.length}
            </div>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className={styles.questionText}>
          {questions[currentQuestion].text}
        </h2>

        <div className={styles.options}>
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              className={`${styles.optionButton} ${
                answers[questions[currentQuestion].id] === option.id
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                handleAnswer(questions[currentQuestion].id, option.id)
              }
            >
              {option.text}
              {option.subtext && (
                <span className={styles.subtext}>{option.subtext}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.navigationButtons}>
          <button
            className={`${styles.navButton} ${
              currentQuestion === 0 ? styles.disabled : ""
            }`}
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            ← {guidance.back}
          </button>
          <button className={styles.navButton} onClick={handleSkip}>
            {currentQuestion === questions.length - 1
              ? "Переглянути результати"
              : "Пропустити →"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine urgency based on answers
const getUrgencyLevel = (answers) => {
  if (answers[1] === "a1") return "високий";
  if (answers[1] === "a2") return "середній";
  return "звичайний";
};

// Helper function to get special offers based on treatment
const getSpecialOffer = (answers) => {
  const offers = {
    a1: "Доступний терміновий прийом в той же день",
    a2: "10% знижка на імплантацію",
    a3: "Безкоштовне відбілювання при косметичному лікуванні",
    a4: "Безкоштовна ортодонтична консультація",
    a5: "Безкоштовний огляд порожнини рота",
  };
  return offers[answers[1]] || "Безкоштовна початкова консультація";
};

export default Guidance; 