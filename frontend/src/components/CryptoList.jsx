import { useEffect, useState } from "react";

// Define the base URL for the CoinGecko API to fetch market data
const BASE_URL = "https://api.coingecko.com/api/v3";

const CryptoList =  () => {
    // State variables to hold the crypto data and loading status
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch cryptocurrency data
  const fetchCryptos = async () => {
    try {
      // Check for Cached Data: Before making a new request to the API,
      // the code checks if the data already exists in localStorage.
      const cachedCryptos = localStorage.getItem("cryptos");
      if (cachedCryptos) {
        console.log("Serving from cache");
        setCryptos(JSON.parse(cachedCryptos));
        setLoading(false);
        return;
      }

      // If no cached data exists, fetch fresh data from the CoinGecko API
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
      );

      
      // Store Data in localStorage AFTER the data is fetched
      const data = await response.json();
      localStorage.setItem("cryptos", JSON.stringify(data));
      setCryptos(data);
    } catch (error) {
      console.error("Error fetching cryptos:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to run fetchCryptos when the component mounts
  useEffect(() => { 
    fetchCryptos();// Fetch cryptocurrency data when the component mounts
  }, []); // Empty dependency array ensures it runs only once on mount

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-6">
      <ol>
        {cryptos.map((crypto, index) => (
          <li
            key={crypto.id}
            className="flex items-center space-x-3 p-4 border-b border-gray-300 text-white"
          >
            <span className="text-xl font-semibold">{index + 1}.</span>
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{crypto.name}</h2>
              <p className="text-sm text-gray-400">
                {crypto.symbol.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-lg font-bold text-green-400">
                <span className="font-semibold">Price:</span> $
                {crypto.current_price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Market Cap:</span> $
                {crypto.market_cap.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CryptoList;
