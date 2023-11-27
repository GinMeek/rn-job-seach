export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i"
    );
    return pattern.test(url);
  }
};

export const renderLocation = (city, state, country) => {
  if (!city) city = "";
  else city = city + ", ";

  if (!state) state = "";
  else state = state + ", ";

  if (!country) country = "";

  const location = `${city}${state}${country}`;

  return location;
};
