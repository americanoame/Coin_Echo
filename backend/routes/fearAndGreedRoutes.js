// backend/routes/fearAndGreedRoutes.js

import express from 'express';
import { getFearAndGreedData } from '../controllers/fearAndGreedController.js';

const router = express.Router();

// Define your route to get the Fear and Greed data
router.get('/fear-and-greed-data', getFearAndGreedData);

export default router;
