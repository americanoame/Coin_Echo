import MarketDominanceChart from "../components/MarketDominanceChart";
import ReloadBbutton from "../components/ReloadBbutton";

const MarketOverview = ({ marketData }) => {
  if (!marketData) return <p>Loading market data...</p>;

  return (
    <div className="h-[900px]  p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded shadow-lg text-white mb-6 md:mb-0">
      <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
      <ul className="space-y-2">
        <li>
          <span className="font-bold">Active Cryptocurrencies:</span>{" "}
          {marketData.active_cryptocurrencies}
        </li>
        <li>
          <span className="font-bold">Active Exchanges:</span>{" "}
          {marketData.active_exchanges}
        </li>
        <li>
          <span className="font-bold">BTC Dominance:</span>{" "}
          {marketData.btc_dominance?.toFixed(2)}%
        </li>
        <li>
          <span className="font-bold">ETH Dominance:</span>{" "}
          {marketData.eth_dominance?.toFixed(2)}%
        </li>
        <li>
          <span className="font-bold">DeFi Market Cap:</span> $
          {marketData.defi_market_cap.toLocaleString()}
        </li>
        <li>
          <span className="font-bold">Stable Coin Market Cap:</span> $
          {marketData.stablecoin_market_cap.toLocaleString()}
        </li>
        <li>
          <span className="font-bold">Last Updated:</span>{" "}
          {new Date(marketData.last_updated).toLocaleString()}
        </li>
      </ul>
      <MarketDominanceChart marketData={marketData} />
      <ReloadBbutton />
    </div>
  );
};

export default MarketOverview;
