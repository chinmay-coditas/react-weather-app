import axios from "axios";

export const getOpenWeatherData = async (
  latitude: string,
  longitude: string
) => {
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=7222d77720ff91f2c48972b4cb568221"
  );
  return data;
};

export const getOpenWeatherDataByCityName = async (cityName: string) => {
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=7222d77720ff91f2c48972b4cb568221"
  );
  return data;
};

export const getAirPollutionData = async (
  latitude: string,
  longitude: string
) => {
  const { data } = await axios.get(
    "http://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=7222d77720ff91f2c48972b4cb568221"
  );
  return data;
};
