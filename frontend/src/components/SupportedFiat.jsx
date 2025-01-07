import { useEffect, useState } from "react";

const FearAndGreedHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fearAndGreedBaseUrl = "http://localhost:3000/api/fear-and-greed-data";

  useEffect(() => {
    const fetchMarketDataAndChartData = async () => {
      try {
        // Always fetch from the backend, regardless of localStorage
        const response = await fetch(`${fearAndGreedBaseUrl}/fear-and-greed-data`);

        if (!response.ok) {
          throw new Error("Failed to fetch fearAndGreedData from the backend");
        }

        const result = await response.json();
        console.log("FearAndGreedData received from the backend:", result); // Log the fetched data structure

        // Check if the result has the expected structure
        if (!result || !result.data) {
          throw new Error("Invalid or missing data");
        }

        // Set data and save it to localStorage for future use
        setData(result.data);
        localStorage.setItem("fearAndGreedData", JSON.stringify(result.data));

      } catch (error) {
        console.error("Error fetching Fear and Greed data:", error);
      } finally {
        setLoading(false);  // Stop loading spinner once data is fetched
      }
    };

    fetchMarketDataAndChartData();
  }, []);  // Empty dependency array means this effect runs once on mount

  // If data is still loading
  if (loading) return <p className="text-center">Loading...</p>;

  // If data is not available, show an error message
  if (!data) {
    return <p>Error: No data available</p>;
  }

  // Since data is an object, render its properties directly
  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-[12px] text-white">Fear and Greed Data</h1>
      <div className="p-4 border-b border-gray-300 text-white">
        <div>
          <p className="text-lg text-white font-[10px]">Update Time: {data.update_time}</p>
          <p className="text-sm text-gray-400">Index: {data.value}</p>
        </div>
        <p
          className={`text-lg font-bold ${
            data.value_classification === "Greed"
              ? "text-green-400"
              : data.value_classification === "Fear"
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {data.value_classification}
        </p>
      </div>
    </div>
  );
};

export default FearAndGreedHistory;
