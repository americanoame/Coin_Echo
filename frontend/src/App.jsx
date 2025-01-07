import Header from "./components/Header";
import Converter from "./components/Convert";
import Footer from "./components/Footer";



const App = () => {
  return (
    <div>
      <Header />
      
      <Converter />
      
      <Footer /> 
    </div>
  )
}

export default App





































// import { useState } from "react";
// import CryptoList from "./components/CryptoList";
// import Wallet from "./components/Wallet";


// const App = () => {

//   const [wallet, setWallet] = useState([]);

//   const handleBuy = (crypto) => {
//     setWallet((prevWallet) => [...prevWallet, crypto]);
//   };

//   return (
//     <div className=" min-h-screen bg-gradient-to-r from-black via-purple-900 to-blue-900 text-white relative p-5">
//       <div className=" absolute inset-0 z-0 bg-gradient-to-tl from-pink-500 via-purple-700 to-indigo-900 opacity-40"></div>
//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12  gap-5">
//         <div className="lg:col-span-7 p-0 ">
//         <CryptoList onBuy={handleBuy} />
//         </div>
//         <div className="lg:col-span-5 p-0 m-0">
//         <Wallet wallet={wallet} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
