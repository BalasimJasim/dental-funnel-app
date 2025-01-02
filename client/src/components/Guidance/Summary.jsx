import PropTypes from "prop-types";
import styles from "./Summary.module.css";

const TREATMENTS = {
  pain: "Термінова допомога при болю",
  missing: "Протезування зубів",
  aesthetic: "Естетична стоматологія",
  alignment: "Ортодонтія",
  prevention: "Профілактичний огляд",
};

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
};

const Summary = ({ answers, onConfirm, onBack }) => {
  const mainConcern = answers[1];
  const recommendation = TREATMENT_RECOMMENDATIONS[mainConcern] || {
    title: TREATMENTS[mainConcern] || "Консультація",
    description:
      "Персональна консультація з лікарем для визначення плану лікування",
    benefits: [
      "Детальна діагностика",
      "Індивідуальний план лікування",
      "Обговорення всіх варіантів",
      "Розрахунок вартості",
    ],
  };

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Ваш Персональний План Лікування</h2>

      <div className={styles.card}>
        <div className={styles.mainConcern}>
          <h3>{recommendation.title}</h3>
          <p>{recommendation.description}</p>

          <div className={styles.benefits}>
            <h4>Переваги рішення:</h4>
            <ul>
              {recommendation.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.timeline}>
          <h3>Орієнтовні терміни лікування</h3>
          <p>
            {answers[2] === "recent"
              ? "Можливість негайної імплантації протягом 24-48 годин"
              : "Консультація та планування протягом тижня"}
          </p>
        </div>

        <div className={styles.nextSteps}>
          <h3>Наступні кроки</h3>
          <ol>
            <li>3D діагностика та планування імплантації</li>
            <li>Консультація з імплантологом</li>
            <li>Обговорення варіантів імплантів та вартості</li>
            <li>Складання детального плану лікування</li>
          </ol>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.backButton} onClick={onBack}>
          ← Змінити відповіді
        </button>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Записатися на консультацію →
        </button>
      </div>
    </div>
  );
};

Summary.propTypes = {
  answers: PropTypes.objectOf(PropTypes.string).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Summary;
