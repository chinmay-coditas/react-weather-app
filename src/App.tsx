import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import weatherIcon from "./assets/weather-icon.svg";
import rightArrowIcon from "./assets/right-arrow.svg";
import IndexInfo from "./components/IndexInfo/IndexInfo";
import SearchWidget from "./components/SearchWidget/SearchWidget";
import SunriseSunsetInfo from "./components/SunriseSunsetInfo/SunriseSunsetInfo";
import TemperatureInfo from "./components/TemperatureInfo/TemperatureInfo";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle/TemperatureUnitToggle";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import { geoCurrentLocation } from "./services/geolocation.service";
import {
  getAirPollutionData,
  getOpenWeatherData,
  getOpenWeatherDataByCityName,
} from "./services/openweather.service";

const App = () => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [cityName, setCityName] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [airPollutionData, setAirPollutionData] = useState<any>([]);
  const [sunData, setSunData] = useState<any>({
    sunrise: "--:--",
    sunset: "--:--",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const currentDate = new Date();

  const getLocationData = async () => {
    if (cityName) {
      getOpenWeatherInfoByCityName(cityName);
    } else {
      const currentLocationData = await geoCurrentLocation();

      const weatherData = await getOpenWeatherData(
        (currentLocationData as any).latitude,
        (currentLocationData as any).longitude
      );
      updateAppState(weatherData, currentLocationData);
    }

    setIsLoading(false);
  };

  const updateAppState = (weatherData: any, currentLocationData: any) => {
    setWeatherData(weatherData);
    updateSunInfo(weatherData?.sys);
    setCityName(weatherData?.name);
    setCurrentTemperature(weatherData?.main?.temp);
    getAirPollutionInfo(currentLocationData);
  };

  const updateSunInfo = (sunInfo: { sunrise: number; sunset: number }) => {
    setSunData({
      sunrise: formatTime12Hour(new Date(sunInfo?.sunrise * 1000)),
      sunset: formatTime12Hour(new Date(sunInfo?.sunset * 1000)),
    });
  };

  const formatTime12Hour = (date: Date) => {
    const hours = date.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const ampm = date.getHours() >= 12 ? "pm" : "am";
    return `${hours}:${minutes}`;
  };

  const getOpenWeatherInfoByCityName = async (cityName: string) => {
    const weatherData = await getOpenWeatherDataByCityName(cityName);
    const newCoords = {
      latitude: weatherData?.coord?.lat,
      longitude: weatherData?.coord?.lon,
    };
    updateAppState(weatherData, newCoords);
    setShowSearchInput(false);
    setIsLoading(false);
  };

  const getAirPollutionInfo = async (currentLocationData: any) => {
    const airPollutionData = await getAirPollutionData(
      currentLocationData.latitude,
      currentLocationData.longitude
    );
    setAirPollutionData(airPollutionData);
  };

  const updateWeatherInfo = async (event: any) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      setCityName(event.target.value);
      getOpenWeatherInfoByCityName(event.target.value);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getLocationData();
  }, []);

  return (
    <div className={styles.MainContainer}>
      {isLoading ? (
        <div className={styles.LoaderContainer}>
          <div className={styles.Loader}></div>
        </div>
      ) : null}
      <div className={styles.LeftSection}>
        <div className={styles.WeatherTemperatureWrapper}>
          <div className={styles.TemperatureToggleWrapper}>
            <div className={styles.TemperatureContainer}>
              <img
                className={styles.WeatherIcon}
                src={weatherIcon}
                alt="Weather Icon"
              />

              {currentTemperature > 0 ? (
                <div className={styles.Temperature}>
                  {Math.round(currentTemperature * 10) / 10}
                  <div className={styles.Unit}>° {isCelsius ? "C" : "F"}</div>
                </div>
              ) : null}
            </div>

            <div className={styles.TemperatureUnitToggleContainer}>
              <TemperatureUnitToggle
                isCelsius={isCelsius}
                handleToggle={() => {
                  isCelsius
                    ? setCurrentTemperature(weatherData?.main?.temp * 1.8 + 32)
                    : setCurrentTemperature(weatherData?.main?.temp);
                  setIsCelsius(!isCelsius);
                }}
              />
            </div>
          </div>

          <div className={styles.DateTimeWrapper}>
            <div className={styles.Date}>{getCurrentDate(currentDate)}</div>

            <div className={styles.DayTimeWrapper}>
              <div className={styles.Day}>{getCurrentDay(currentDate)}</div>
              <span className={styles.DividerLine}></span>
              <div className={styles.Time}>{getCurrentTime(currentDate)}</div>
            </div>
          </div>

          <div className={styles.WeatherInfoContainer}>
            <WeatherInfo
              detailType="Wind"
              info={weatherData?.wind?.speed ? weatherData?.wind?.speed : "0"}
            />
            <WeatherInfo
              detailType="Humidity"
              info={
                weatherData?.main?.humidity ? weatherData?.main?.humidity : "0"
              }
            />
            <WeatherInfo
              detailType="Rain"
              info={weatherData?.rain ? weatherData?.rain!["1h"] : "0"}
            />
          </div>

          <div className={styles.TemperatureInfoContainer}>
            <TemperatureInfo temperature="24" dayLabel="Fri" />
            <TemperatureInfo temperature="24" dayLabel="Sat" />
            <TemperatureInfo temperature="24" dayLabel="Sun" />
            <TemperatureInfo temperature="24" dayLabel="Mon" />

            <div className={styles.Nextarrow}>
              <img src={rightArrowIcon} alt="Right Arrow Icon" />
            </div>
          </div>
        </div>

        <div className={styles.CelsiusFahrenheitWrapper}></div>
      </div>

      <div className={styles.RightSection}>
        <SearchWidget
          currentLocation={cityName!}
          showSearchInput={showSearchInput}
          handleSearchButtonIconClick={() =>
            setShowSearchInput(!showSearchInput)
          }
          handleSearchInput={updateWeatherInfo}
        />

        <div className={styles.SunriseSunsetInfoContainer}>
          <SunriseSunsetInfo
            size="Small"
            label="Sunrise"
            startTime={sunData.sunrise}
          />
          <SunriseSunsetInfo
            size="Large"
            label="Golden Hour"
            startTime={`6:00 am`}
          />
          <SunriseSunsetInfo
            size="Small"
            label="Sunset"
            startTime={sunData.sunset}
          />
        </div>

        <div className={styles.InfoIconSection}>
          <div className={styles.DividerLine}></div>
          <button className={styles.InfoButton}>
            <span className={styles.ButtonLabel}>i</span>
          </button>
        </div>

        <div className={styles.IndexInfoContainer}>
          <IndexInfo
            label="Air Quality"
            indexValue={
              airPollutionData?.list
                ? airPollutionData?.list[0]?.main?.aqi
                : null
            }
            maxValue="5"
          />
          <IndexInfo label="UV Index" indexValue="6" maxValue="10" />
        </div>
      </div>
    </div>
  );

  function getCurrentDay(date: Date) {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][date.getDay()];
  }

  function getCurrentTime(date: Date) {
    let time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return time;
  }

  function getCurrentDate(date: Date) {
    let day = date.getDate();

    let suffix = "";
    if (day % 10 == 1 && day != 11) {
      suffix = "st";
    } else if (day % 10 == 2 && day != 12) {
      suffix = "nd";
    } else if (day % 10 == 3 && day != 13) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
    day = parseInt(day + suffix);

    let month = date.toLocaleString("en", { month: "short" });

    let year = date.getFullYear().toString().slice(-2);

    let formattedDate = day + " " + month + " ‘" + year;

    return formattedDate;
  }
};

export default App;
