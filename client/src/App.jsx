import { useState } from 'react'
import Landing from './components/Landing/Landing'
import Guidance from './components/Guidance/Guidance'
import Appointment from './components/Appointment/Appointment'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [previousView, setPreviousView] = useState(null);

  const handleStartGuidance = () => {
    setPreviousView('landing');
    setCurrentView('guidance');
  };

  const handleCompleteGuidance = () => {
    setPreviousView('guidance');
    setCurrentView('appointment');
  };

  const handleBack = () => {
    setCurrentView(previousView);
  };

  const handleReturnHome = () => {
    setCurrentView('landing');
    setPreviousView(null);
  };

  return (
    <div className="app">
      {currentView === 'landing' && (
        <Landing onStartGuidance={handleStartGuidance} />
      )}
      {currentView === 'guidance' && (
        <Guidance 
          onComplete={handleCompleteGuidance} 
          onBack={handleBack}
          onReturnHome={handleReturnHome}
        />
      )}
      {currentView === 'appointment' && (
        <Appointment 
          onBack={handleBack}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  )
}

export default App
