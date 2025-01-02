import PropTypes from "prop-types";
import styles from "./Summary.module.css";

const TREATMENTS = {
  pain: "Термінова допомога при болю",
  missing: "Протезування зубів",
  aesthetic: "Естетична стоматологія",
  alignment: "Ортодонтія",
  prevention: "Профілактичний огляд",
};

const Summary = ({ answers, onConfirm, onBack }) => {
  const mainConcern = TREATMENTS[answers[1]] || "Консультація";

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Ваш План Лікування</h2>

      <div className={styles.card}>
        <div className={styles.mainConcern}>
          <h3>Основна потреба</h3>
          <p>{mainConcern}</p>
        </div>

        <div className={styles.timeline}>
          <h3>Рекомендований час</h3>
          <p>
            {answers[2] === "recent" || answers[1] === "pain"
              ? "Терміновий запис протягом 24 годин"
              : "Запис на зручний для вас час"}
          </p>
        </div>

        <div className={styles.nextSteps}>
          <h3>Наступні кроки</h3>
          <ol>
            <li>Консультація та діагностика</li>
            <li>Складання детального плану лікування</li>
            <li>Обговорення варіантів та вартості</li>
          </ol>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.backButton} onClick={onBack}>
          ← Змінити відповіді
        </button>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Записатися на прийом →
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
