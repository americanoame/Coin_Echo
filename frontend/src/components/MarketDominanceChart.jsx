import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MarketDominanceChart = ({ marketData }) => {
  const pieChartData = {
    labels: ["Bitcoin", "Ethereum", "Others"],
    datasets: [
      {
        data: [
          marketData.btc_dominance,
          marketData.eth_dominance,
          100 - (marketData.btc_dominance + marketData.eth_dominance),
        ],
        backgroundColor: ["#FF5733", "#28a745", "#007bff"],
        hoverBackgroundColor: ["#FF6F47", "#55d68a", "#0069d9"],
      },
    ],
  };

  return <Pie data={pieChartData} />;
};

export default MarketDominanceChart;
