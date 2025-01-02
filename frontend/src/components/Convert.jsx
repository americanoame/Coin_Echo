import { useEffect, useRef, useState } from "react";
import CryptoList from "../components/CryptoList";
import MarketOverview from "../components/MarketOverview";
import CryptoDetails from "../components/CryptoDetails";
import  useCryptoConverter  from "../components/UseCryptoConverter";
import SupportedFiat from "../components/SupportedFiat";

const CryptoConverter = () => {
  const {
    cryptoAmount,
    setCryptoAmount,
    cryptoType,
    setCryptoType,
    usdValue,
    coinImage,
    marketCap,
    handleConversion,
  } = useCryptoConverter();

  const [marketData, setMarketData] = useState(null);
  const chartDataRef = useRef(null);
  const marketDataBaseUrl = "http://localhost:3000/api/market-data";

  useEffect(() => {
    const fetchMarketDataAndChartData = async () => {
      try {
        const cachedMarketData = localStorage.getItem("marketData");
        const cachedChartData = localStorage.getItem("chartData");

        if (cachedMarketData && cachedChartData) {
          setMarketData(JSON.parse(cachedMarketData));
          chartDataRef.current = JSON.parse(cachedChartData);
          return;
        }

        const response = await fetch(`${marketDataBaseUrl}/market-data`);
        if (!response.ok) throw new Error("Failed to fetch data from the backend");

        const data = await response.json();
        if (data.data) {
          setMarketData(data.data);
          localStorage.setItem("marketData", JSON.stringify(data.data));
        }
        if (data.prices) {
          chartDataRef.current = data.prices;
          localStorage.setItem("chartData", JSON.stringify(data.prices));
        }
      } catch (error) {
        console.error("Error fetching market and chart data:", error);
      }
    };

    fetchMarketDataAndChartData();
  }, [cryptoType]);

  return (
    <div className="mt-24 w-full max-w-[1800px] mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 flex flex-col h-full">
          <CryptoList />
        </div>
        <div className="bg-gray-100 p-4">
          <MarketOverview marketData={marketData} />
        </div>
        <div className="p-4 flex flex-col">
          <div className="mb-8">
            <SupportedFiat />
          </div>
          <CryptoDetails 
            cryptoAmount={cryptoAmount}
            setCryptoAmount={setCryptoAmount}
            cryptoType={cryptoType}
            setCryptoType={setCryptoType}
            handleConversion={handleConversion}
            usdValue={usdValue}
            coinImage={coinImage}
            marketCap={marketCap}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;












































// import { useEffect, useRef, useState } from "react";
// import CryptoList from "../components/CryptoList";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import useCryptoConverter from "../components/UseCryptoConverter";
// import SupportedFiat from "../components/SupportedFiat";

// // Register necessary Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const CryptoConverter = () => {
//   const {
//     cryptoAmount,
//     setCryptoAmount,
//     cryptoType,
//     setCryptoType,
//     usdValue,
//     coinImage,
//     marketCap,
//     handleConversion,
//   } = useCryptoConverter();

//   const [marketData, setMarketData] = useState(null);
//   const chartDataRef = useRef(null);
//   const marketDataBaseUrl = "http://localhost:3000/api/market-data";

//   useEffect(() => {
//     const fetchMarketDataAndChartData = async () => {
//       try {
//         const cachedMarketData = localStorage.getItem("marketData");
//         const cachedChartData = localStorage.getItem("chartData");

//         if (cachedMarketData && cachedChartData) {
//           console.log("Serving market and chart data from cache");
//           setMarketData(JSON.parse(cachedMarketData));
//           chartDataRef.current = JSON.parse(cachedChartData);
//           return;
//         }

//         const response = await fetch(`${marketDataBaseUrl}/market-data`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch data from the backend");
//         }

//         const data = await response.json();

//         if (!data || !data.data) {
//           throw new Error("Invalid data structure received");
//         }

//         console.log("Market Data received from the backend:", data);

//         if (data.data) {
//           setMarketData(data.data);
//           localStorage.setItem("marketData", JSON.stringify(data.data));
//         }

//         if (data.prices) {
//           chartDataRef.current = data.prices;
//           localStorage.setItem("chartData", JSON.stringify(data.prices));
//         }
//       } catch (error) {
//         console.error("Error fetching market and chart data:", error);
//       }
//     };

//     fetchMarketDataAndChartData();
//   }, [cryptoType]);

//   const pieChartData = {
//     labels: ["Bitcoin", "Ethereum", "Others"],
//     datasets: [
//       {
//         data: [
//           marketData ? marketData.btc_dominance : 0,
//           marketData ? marketData.eth_dominance : 0,
//           marketData
//             ? 100 - (marketData.btc_dominance + marketData.eth_dominance)
//             : 0,
//         ],
//         backgroundColor: ["#FF5733", "#28a745", "#007bff"],
//         hoverBackgroundColor: ["#FF6F47", "#55d68a", "#0069d9"],
//       },
//     ],
//   };

//   return (
//     <div className="mt-24 w-full max-w-[1800px] mx-auto px-4 mb-32">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {/* Left Section */}
//         <div className=" p-4 flex flex-col h-full">
//           <CryptoList />
//         </div>

//         {/* Middle Section with Flex to allow growth */}
//         <div className="bg-gray-100 p-4">
//           <div className=" h-[900px] p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded shadow-lg text-white mb-6 md:mb-0 ">
//             <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
//             {marketData ? (
//               <ul className="space-y-2">
//                 <li>
//                   <span className="font-bold">Active Cryptocurrencies:</span>{" "}
//                   {marketData.active_cryptocurrencies}
//                 </li>
//                 <li>
//                   <span className="font-bold">Active Exchanges:</span>{" "}
//                   {marketData.active_exchanges}
//                 </li>
//                 <li>
//                   <span className="font-bold">BTC Dominance:</span>{" "}
//                   {marketData.btc_dominance?.toFixed(2)}%
//                 </li>
//                 <li>
//                   <span className="font-bold">ETH Dominance:</span>{" "}
//                   {marketData.eth_dominance?.toFixed(2)}%
//                 </li>
//                 <li>
//                   <span className="font-bold">DeFi Market Cap:</span> $
//                   {marketData.defi_market_cap.toLocaleString()}
//                 </li>
//                 <li>
//                   <span className="font-bold">Stable Coin Market Cap:</span> $
//                   {marketData.stablecoin_market_cap.toLocaleString()}
//                 </li>
//                 <li>
//                   <span className="font-bold">Last Updated:</span>{" "}
//                   {new Date(marketData.last_updated).toLocaleString()}
//                 </li>
//               </ul>
//             ) : (
//               <p>Loading market data...</p>
//             )}
//             {marketData && (
//               <div className="mt-6">
//                 <h3 className="text-xl font-semibold">Market Dominance</h3>
//                 <Pie data={pieChartData} />
//               </div>
//             )}

//             <button
//               onClick={() => window.location.reload()}
//               className="bg-red-500 text-white p-2 rounded mt-4 w-full hover:bg-red-700"
//             >
//               Refresh Data
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="p-4 flex flex-col ">
//           <div className="mb-8">
      
//             <SupportedFiat />
//           </div>

//           {/* under the right Section  */}

//           <div className=" flex gap-4 mt-4 lg:mt-0 ">
//             <div className="p-4 w-full ">
//               <h2 className="text-xl text-white font-[12px] mb-4">
//                 Convert Cryptocurrency to USD
//               </h2>
//               <input
//                 type="number"
//                 value={cryptoAmount}
//                 onChange={(e) => setCryptoAmount(e.target.value)}
//                 className="p-2 border rounded mb-2 w-full"
//                 placeholder="Enter amount"
//               />
//               <select
//                 value={cryptoType}
//                 onChange={(e) => setCryptoType(e.target.value)}
//                 className="p-2 border rounded mb-2 w-full"
//               >
//                 <option value="bitcoin">Bitcoin</option>
//                 <option value="ethereum">Ethereum</option>
//               </select>
//               <button
//                 onClick={handleConversion}
//                 className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded w-full mt-4 hover:bg-blue-700"
//               >
//                 Convert
//               </button>

//               <div className="bg-white shadow-xl pt-0">
//                 {usdValue && (
//                   <p className="mt-4 p-4 text-lg font-semibold">
//                     USD Value: ${usdValue}
//                   </p>
//                 )}
//                 {coinImage && (
//                   <img
//                     src={coinImage}
//                     alt={cryptoType}
//                     className="mt-4 w-32 h-32 mx-auto"
//                   />
//                 )}
//                 {marketCap && (
//                   <p className="p-4 text-lg">
//                     Market Cap: ${marketCap.toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CryptoConverter;
