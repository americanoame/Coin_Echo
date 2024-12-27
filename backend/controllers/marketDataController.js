// backend/controllers/marketDataController.js


// Controller function to fetch market data from CoinMarketCap API
export const getMarketData = async (req, res) => {
    try {
      // Make a request to CoinMarketCap API to fetch global market data
      const response = await fetch('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
        // Set the required API key in the headers to authenticate the request
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY, // Get API key from environment variables
        },
      });
      // Parse the JSON data received from the CoinMarketCap API
      const data = await response.json();
      
      // Send the fetched market data to the frontend as a JSON response
      res.json(data); 
    } catch (error) {
      // If an error occurs (e.g., network issues, invalid response), send a 500 error to the client
      res.status(500).json({ error: 'Failed to fetch market data' });
    }
  };
  