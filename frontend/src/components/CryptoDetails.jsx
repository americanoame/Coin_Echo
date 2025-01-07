const CryptoDetails = ({
    cryptoAmount,
    setCryptoAmount,
    cryptoType,
    setCryptoType,
    handleConversion,
    usdValue,
    coinImage,
    marketCap,
  }) => {
    return (
      <div className="p-4 w-full">
        <h2 className="text-xl text-white font-[12px] mb-4">Convert Cryptocurrency to USD</h2>
        <input
          type="number"
          value={cryptoAmount}
          onChange={(e) => setCryptoAmount(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
          placeholder="Enter amount"
        />
        <select
          value={cryptoType}
          onChange={(e) => setCryptoType(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
        </select>
        <button
          onClick={handleConversion}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded w-full mt-4 hover:bg-blue-700"
        >
          Convert
        </button>
  
        <div className="bg-white shadow-xl pt-0">
          {usdValue && <p className="mt-4 p-4 text-lg font-semibold">USD Value: ${usdValue}</p>}
          {coinImage && <img src={coinImage} alt={cryptoType} className="mt-4 w-32 h-32 mx-auto" />}
          {marketCap && <p className="p-4 text-lg">Market Cap: ${marketCap.toLocaleString()}</p>}
        </div>
      </div>
    );
  };
  
  export default CryptoDetails;
  