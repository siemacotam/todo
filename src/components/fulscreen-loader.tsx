const FulscreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent border-t-4 rounded-full animate-spin" />
    </div>
  );
};

export default FulscreenLoader;
