import express from "express";
import marketDataRoutes from './routes/marketDataRoutes.js';
import fearAndGreedRoutes from "./routes/fearAndGreedRoutes.js"
import { corsMiddleware } from "./middleware/corsMiddleware.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = 3000

app.use(corsMiddleware);

// Middleware to handle JSON body parsing
app.use(express.json());

// Routes
app.use('/api/market-data', marketDataRoutes); 
app.use('/api/fear-and-greed-data', fearAndGreedRoutes);


  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});