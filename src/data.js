export const API_KEY = import.meta.env.VITE_API_KEY;

export const value_converter = (val) => {
  if (val >= 1000000) {
    return Math.floor(val / 1000000) + "M";
  } else if (val >= 1000) {
    return Math.floor(val / 1000) + "K";
  } else {
    return val;
  }
};
export const toTopScroll = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
