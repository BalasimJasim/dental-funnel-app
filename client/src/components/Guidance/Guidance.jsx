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
        id: "a1",
        text: "Біль або дискомфорт",
        subtext: "Позбавтеся зубного болю та болю в яснах",
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
  // ... other questions with Ukrainian text
];

const Guidance = ({ onComplete, onBack, onReturnHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const getSecondQuestionOptions = () => {
    switch (answers[1]) {
      case "a1":
        return [
          { id: "b1", text: "Regular check-up and cleaning" },
          { id: "b2", text: "Deep cleaning" },
          { id: "b3", text: "Cavity check" },
          { id: "b4", text: "General consultation" },
        ];
      case "a2":
        return [
          { id: "b5", text: "Tooth pain" },
          { id: "b6", text: "Gum problems" },
          { id: "b7", text: "Root canal pain" },
          { id: "b8", text: "Night grinding/TMJ pain" },
        ];
      case "a3":
        return [
          { id: "b9", text: "Teeth whitening" },
          { id: "b10", text: "Veneers or bonding" },
          { id: "b11", text: "Smile makeover" },
          { id: "b12", text: "Fix chipped or broken teeth" },
        ];
      case "a4":
        return [
          { id: "b13", text: "Single tooth replacement" },
          { id: "b14", text: "Multiple teeth replacement" },
          { id: "b15", text: "Full arch replacement" },
          { id: "b16", text: "Dentures" },
        ];
      case "a5":
        return [
          { id: "b17", text: "Traditional braces" },
          { id: "b18", text: "Clear aligners" },
          { id: "b19", text: "Child orthodontics" },
          { id: "b20", text: "Retainers" },
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
    // Enhanced recommendation logic based on answers
    const firstAnswer = answers[1];
    const secondAnswer = answers[2];

    if (firstAnswer === "a1") {
      return {
        service: "General Consultation & Cleaning",
        description:
          "Our comprehensive check-up includes professional cleaning, detailed examination, and personalized oral health recommendations.",
        estimatedCost: "$100 - $200",
        category: "Operative Dentistry",
        details: [
          "Professional teeth cleaning",
          "Digital X-rays if needed",
          "Oral cancer screening",
          "Personalized care plan",
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
        service: "Emergency Dental Care",
        description:
          "We provide prompt attention to dental pain with comprehensive diagnosis and treatment options.",
        estimatedCost: "$150 - $800",
        category: "Operative Dentistry",
        details: [
          "Same-day emergency appointments",
          "Pain management",
          "Root canal treatment if needed",
          "Follow-up care plan",
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
    } else if (firstAnswer === "a3") {
      return {
        service: "Cosmetic Dentistry Consultation",
        description:
          "Transform your smile with our advanced cosmetic dental procedures.",
        estimatedCost: "$500 - $3000",
        category: "Operative Dentistry",
        details: [
          "Digital smile design",
          "Whitening options",
          "Veneer consultation",
          "Payment plan options",
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
          <h2 className={styles.resultTitle}>Your Recommended Treatment</h2>
          <div className={styles.recommendationCard}>
            <h3>{recommendation.service}</h3>
            <p className={styles.category}>
              Category: {recommendation.category}
            </p>
            <p className={styles.description}>{recommendation.description}</p>
            <div className={styles.details}>
              <h4>What's Included:</h4>
              <ul>
                {recommendation.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <p className={styles.estimatedCost}>
              Estimated Cost: {recommendation.estimatedCost}
            </p>
            <div className={styles.navigationButtons}>
              <button
                className={`${styles.actionButton} ${styles.secondaryButton}`}
                onClick={() => setShowResults(false)}
              >
                Back to Questions
              </button>
              <button className={styles.actionButton} onClick={onComplete}>
                Book Consultation Now
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
    <div className="guidance">
      <h2>{guidance.title}</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(guidance.questions).map(([key, question]) => (
          <div key={key} className="question">
            <p>{question}</p>
            <div className="options">
              <button
                type="button"
                onClick={() => handleAnswer(key, true)}
                className={answers[key] === true ? "active" : ""}
              >
                {guidance.options.yes}
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(key, false)}
                className={answers[key] === false ? "active" : ""}
              >
                {guidance.options.no}
              </button>
            </div>
          </div>
        ))}
        <button type="submit">{guidance.submit}</button>
      </form>
    </div>
  );
};

// Helper function to determine urgency based on answers
const getUrgencyLevel = (answers) => {
  if (answers[1] === 'a1') return 'high';
  if (answers[1] === 'a2') return 'medium';
  return 'normal';
};

// Helper function to get special offers based on treatment
const getSpecialOffer = (answers) => {
  const offers = {
    'a1': 'Emergency same-day appointment available',
    'a2': '10% off on implant treatments',
    'a3': 'Free whitening with cosmetic treatments',
    'a4': 'Complimentary orthodontic consultation',
    'a5': 'Free oral health check-up'
  };
  return offers[answers[1]] || 'Free initial consultation';
};

export default Guidance; 