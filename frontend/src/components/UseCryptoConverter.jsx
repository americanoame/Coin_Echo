
import { useState } from "react";

const useCryptoConverter = () => {
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [cryptoType, setCryptoType] = useState("bitcoin");
  const [usdValue, setUsdValue] = useState(null);
  const [coinImage, setCoinImage] = useState(null);
  const [marketCap, setMarketCap] = useState(null);

  const handleConversion = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoType}&vs_currencies=usd`
      );
      const data = await response.json();
      const cryptoToUsd = cryptoAmount * data[cryptoType].usd;

      const coinDataResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoType}`
      );
      const coinData = await coinDataResponse.json();

      setCoinImage(coinData.image.small);
      setMarketCap(coinData.market_data.market_cap.usd);
      setUsdValue(cryptoToUsd.toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    cryptoAmount,
    setCryptoAmount,
    cryptoType,
    setCryptoType,
    usdValue,
    coinImage,
    marketCap,
    handleConversion,
  };
};

export default useCryptoConverter;
