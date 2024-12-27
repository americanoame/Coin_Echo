import express from 'express';
import { getMarketData } from '../controllers/marketDataController.js';

const router = express.Router();

// Define your route 
router.get('/market-data', getMarketData);

export default router;