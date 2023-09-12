import styles from "./App.module.scss";
import weatherIcon from "./assets/weather-icon.svg";
import SearchWidget from "./components/SearchWidget/SearchWidget";
import TemperatureInfo from "./components/TemperatureInfo/TemperatureInfo";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle/TemperatureUnitToggle";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

const App = () => {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.LeftSection}>
        <div className={styles.WeatherTemperatureWrapper}>
          <div className={styles.TemperatureToggleWrapper}>
            <div className={styles.TemperatureContainer}>
              <img className={styles.WeatherIcon} src={weatherIcon} alt="" />

              <div className={styles.Temperature}>
                27
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
              <div className={styles.Day}>{getTodaysDay()}</div>
              <span className={styles.DividerLine}></span>
              <div className={styles.Time}>{getCurrentTime()}</div>
            </div>
          </div>

          <div className={styles.WeatherInfoContainer}>
            <WeatherInfo detailType="Wind" info="4.2" />
            <WeatherInfo detailType="Humidity" info="54" />
            <WeatherInfo detailType="Rain" info="0.2" />
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
        {/* <SearchWidget /> */}
      </div>
    </div>
  );

  function getTodaysDay() {
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
