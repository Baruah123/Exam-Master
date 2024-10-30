// LoadingSpinner.jsx


const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-16 h-16 animate-spin3d">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 transform rotate-0 origin-bottom-left rounded-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-yellow-600 transform rotate-90 origin-top-right rounded-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-green-600 transform rotate-180 origin-bottom-right rounded-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-red-600 transform rotate-270 origin-top-left rounded-sm" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
