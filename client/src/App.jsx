import { useState } from 'react'
import Landing from './components/Landing/Landing'
import Guidance from './components/Guidance/Guidance'
import Appointment from "./components/Appointment/Appointment";
import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = useState("landing");

  const handleStartGuidance = () => {
    setCurrentStep("guidance");
  };

  const handleBack = () => {
    setCurrentStep("landing");
  };

  const handleComplete = () => {
    setCurrentStep("appointment");
  };

  return (
    <div className="app">
      {currentStep === "landing" && (
        <Landing onStartGuidance={handleStartGuidance} />
      )}
      {currentStep === "guidance" && (
        <Guidance onComplete={handleComplete} onBack={handleBack} />
      )}
      {currentStep === "appointment" && <Appointment onBack={handleBack} />}
    </div>
  );
}

export default App
