const ColorDot = ({color}) => {
  // Allow tailwind to compile then classes
  const colors = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
  };

  return (
    color !== "none"
      ? <span className={`${colors[color]} w-5 h-5 rounded-full inline-block`} />
      : <span className={`bg-white text-red-500 text-center w-5 h-5 rounded-full inline-block`}>✖</span>
  );
}

export default ColorDot;