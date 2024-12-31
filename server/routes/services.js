import express from 'express';
import services from '../data/services.js';

const router = express.Router();

// Get all services
router.get('/', (req, res) => {
  res.json(services);
});

// Get service by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryServices = services[category];
  
  if (!categoryServices) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  res.json(categoryServices);
});

export default router; 