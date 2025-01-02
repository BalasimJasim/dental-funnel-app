import { useState, useEffect } from "react";
import Landing from "./components/Landing/Landing";
import Guidance from "./components/Guidance/Guidance";
import Appointment from "./components/Appointment/Appointment";
import "./App.css";

const APP_VERSION = "1.0.1";
// Get build timestamp from Vite define
const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__;

function App() {
  const [currentStep, setCurrentStep] = useState("landing");

  useEffect(() => {
    console.log("[DEBUG] Build timestamp:", BUILD_TIMESTAMP);
    console.log("[DEBUG] App version:", APP_VERSION);
    console.log("[DEBUG] App mounted, currentStep:", currentStep);
  }, []);

  // Log state changes
  useEffect(() => {
    console.log("[DEBUG] Current step changed to:", currentStep);
  }, [currentStep]);

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

export default App;
