import { useEffect, useState } from 'react';
import img1 from "../assets/btc.jpg";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  

  // Handle the scroll event and set the scrolled state
  const handleScroll = () => {
    const offset = window.scrollY;

    console.log('Scroll Position:', offset);
    
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log('Scroll event listener added');
    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Scroll event listener removed');
    };
  }, []);  // Empty dependency array to only add event listener once

  return (
    
    <header className={`bg-blue-700 text-white py-4 flex items-center justify-between px-4 fixed top-0 left-0 w-full z-50 main-nav ${scrolled ? 'sticky-nav' : ''}`}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={img1} alt="Logo" className="w-12 h-12 mr-2 rounded-full" />
        <h1 className="text-2xl font-bold">Crypto Echo Apis</h1>
      </div>

      {/* Hamburger Menu */}
      <FaBars className="text-[30px]" />
    </header>
  );
};

export default Header;
