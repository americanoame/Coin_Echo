// backend/controllers/fearAndGreedController.js

// Controller function to fetch Fear and Greed Index data
export const getFearAndGreedData = async (req, res) => {
    try {
      // Make a request to the Fear and Greed API (e.g., CoinMarketCap or any other provider)
      const response = await fetch('https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest', {
        // Set the required API key in the headers to authenticate the request
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY, // Get API key from environment variables
        },
      });
  
      // Check if the response is not OK (e.g., status code is not 200-299)
      if (!response.ok) {
        console.error('Invalid API response:', response.status, response.statusText);
        return res.status(500).json({ error: 'Failed to fetch valid Fear and Greed data' });
      }
  
      // Parse the JSON data received from the Fear and Greed API
      const data = await response.json();
      
      // Send the fetched Fear and Greed data to the frontend as a JSON response
      res.json(data);
    } catch (error) {
      // If an error occurs (e.g., network issues, invalid response), send a 500 error to the client
      res.status(500).json({ error: 'Failed to fetch Fear and Greed data' });
    }
  };
  