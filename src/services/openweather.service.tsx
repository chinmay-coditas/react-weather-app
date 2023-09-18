import axios from "axios";
import { ApiEndpoints, OpenWeatherApiKey } from "../config";

export const getOpenWeatherData = async (
  latitude: string,
  longitude: string
) => {
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/" +
      ApiEndpoints.WEATHER_API +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=" +
      OpenWeatherApiKey.API_KEY
  );
  return data;
};

export const getOpenWeatherDataByCityName = async (cityName: string) => {
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/" +
      ApiEndpoints.WEATHER_API +
      "?q=" +
      cityName +
      "&units=metric&appid=" +
      OpenWeatherApiKey.API_KEY
  );
  return data;
};

export const getAirPollutionData = async (
  latitude: string,
  longitude: string
) => {
  const { data } = await axios.get(
    "http://api.openweathermap.org/data/2.5/" +
      ApiEndpoints.AIR_POLLUTION_API +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=" +
      OpenWeatherApiKey.API_KEY
  );
  return data;
};
