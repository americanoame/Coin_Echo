const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-blue-700 mx-auto shadow-2xl h-[70px] fixed bottom-0 left-0 z-50">
      <div className="w-full text-center pt-5">
        <p className="pb-1 font-bold text-white">
          Crypto Echo Apis &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
