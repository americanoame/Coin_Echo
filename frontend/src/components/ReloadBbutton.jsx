const ReloadBbutton = () => {
  return (
    <div>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 text-white p-2 rounded mt-4 w-full hover:bg-red-700"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default ReloadBbutton;
