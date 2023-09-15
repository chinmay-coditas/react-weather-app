import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import weatherIcon from "./assets/weather-icon.svg";
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
} from "./services/openweather.service";

const App = () => {
  const [weatherData, setWeatherData] = useState([] as any);
  const [airPollutionData, setAirPollutionData] = useState([] as any);
  const [sunData, setSunData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);

  const getLocationData = async () => {
    const currentLocationData = await geoCurrentLocation();

    const weatherData = await getOpenWeatherData(
      (currentLocationData as any).latitude,
      (currentLocationData as any).longitude
    );
    setWeatherData(weatherData);
    console.log(weatherData);

    const airPollutionData = await getAirPollutionData(
      (currentLocationData as any).latitude,
      (currentLocationData as any).longitude
    );
    setAirPollutionData(airPollutionData);
    console.log(airPollutionData);

    setIsLoading(false);

    function formatTime12Hour(date: Date): string {
      const hours = date.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
      const minutes = date.getMinutes().toString().padStart(2, "0");
      // const ampm = date.getHours() >= 12 ? "pm" : "am";
      return `${hours}:${minutes}`;
    }

    setSunData({
      sunrise: formatTime12Hour(new Date(weatherData?.sys?.sunrise * 1000)),
      sunset: formatTime12Hour(new Date(weatherData?.sys?.sunset * 1000)),
    });

    console.log(sunData);
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
              <img className={styles.WeatherIcon} src={weatherIcon} alt="" />

              <div className={styles.Temperature}>
                {Math.round(weatherData?.main?.temp * 10) / 10}
                <div className={styles.Unit}>° C</div>
              </div>
            </div>

            <div className={styles.TemperatureUnitToggleContainer}>
              <TemperatureUnitToggle />
            </div>
          </div>

          <div className={styles.DateTimeWrapper}>
            <div className={styles.Date}>{getCurrentDate()}</div>

            <div className={styles.DayTimeWrapper}>
              <div className={styles.Day}>{getCurrentDay()}</div>
              <span className={styles.DividerLine}></span>
              <div className={styles.Time}>{getCurrentTime()}</div>
            </div>
          </div>

          <div className={styles.WeatherInfoContainer}>
            <WeatherInfo detailType="Wind" info={weatherData?.wind?.speed} />
            <WeatherInfo
              detailType="Humidity"
              info={weatherData?.main?.humidity}
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
          </div>
        </div>

        <div className={styles.CelsiusFahrenheitWrapper}></div>
      </div>

      <div className={styles.RightSection}>
        <SearchWidget currentLocation={weatherData.name} />

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

  function getCurrentDay() {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][new Date().getDay()];
  }

  function getCurrentTime() {
    let now = new Date();

    let time = now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return time;
  }

  function getCurrentDate() {
    let date = new Date();

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
