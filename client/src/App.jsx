import { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import Landing from "./components/Landing/Landing";
import Guidance from "./components/Guidance/Guidance";
import Appointment from "./components/Appointment/Appointment";
import styles from "./App.module.css";

function App({ isStandalone = true }) {
  const [currentStep, setCurrentStep] = useState("landing");
  const [assessmentAnswers, setAssessmentAnswers] = useState({});

  // Debug logging for production
  useEffect(() => {
    if (import.meta.env.PROD) {
      console.log("Running in production mode");
      console.log("API URL:", import.meta.env.VITE_API_URL);
      console.log("Styles loaded:", styles);
    }
  }, []);

  const handleStartGuidance = () => {
    setCurrentStep("guidance");
  };

  const handleGuidanceComplete = (answers) => {
    setAssessmentAnswers(answers);
    setCurrentStep("appointment");
  };

  const handleBack = () => {
    if (currentStep === "guidance") {
      setCurrentStep("landing");
    } else if (currentStep === "appointment") {
      setCurrentStep("guidance");
    }
  };

  return (
    <Layout isStandalone={isStandalone}>
      <div className={styles.app} data-env={import.meta.env.MODE}>
        {currentStep === "landing" && (
          <Landing onStartGuidance={handleStartGuidance} />
        )}
        {currentStep === "guidance" && (
          <Guidance onComplete={handleGuidanceComplete} onBack={handleBack} />
        )}
        {currentStep === "appointment" && (
          <Appointment
            assessmentAnswers={assessmentAnswers}
            onBack={handleBack}
          />
        )}
      </div>
    </Layout>
  );
}

export default App;
