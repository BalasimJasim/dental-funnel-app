import express from 'express';
import services from '../data/services.js';

const router = express.Router();

// Process user responses and return recommended services
router.post('/', (req, res) => {
  const { answers } = req.body;
  
  // Simple recommendation logic based on user answers
  let recommendedServices = [];
  let category = '';

  switch (answers[1]) { // Based on first question answer
    case 'a1':
      category = 'operativeDentistry';
      break;
    case 'a2':
      category = 'prostheticDentistry';
      break;
    case 'a3':
      category = 'orthodontics';
      break;
    case 'a4':
      category = 'dentalSurgery';
      break;
    default:
      category = 'consultations';
  }

  recommendedServices = services[category];

  res.json({
    recommendation: {
      category,
      services: recommendedServices,
      urgency: answers[1] === 'a1' ? 'high' : 'normal',
      nextSteps: [
        'Book a consultation',
        'Meet with specialist',
        'Get treatment plan',
        'Begin treatment'
      ]
    }
  });
});

export default router; 