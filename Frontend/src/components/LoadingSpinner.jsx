// LoadingSpinner.jsx

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Main spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin" />
          <div className="absolute w-full h-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-blue-400 rounded-full animate-spin-slow" />
        </div>
        {/* Loading text */}
        <div className="text-blue-400 font-semibold tracking-wider animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
