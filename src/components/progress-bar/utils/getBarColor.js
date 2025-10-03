const getBarColor = (value) => {
  if (value === 0) return "!text-red-500 ml-12";
  if (value >= 1 && value <= 3) return "!text-white !bg-red-500 ml-8";
  if (value < 20) return "bg-red-500";
  if (value < 50) return "bg-yellow-500";
  return "!bg-green-500 !ml-0";
};

export default getBarColor;
