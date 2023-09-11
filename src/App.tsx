import styles from "./App.module.scss";
import weatherIcon from './assets/weather-icon.svg'

function App() {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.LeftSection}>
        <div className={styles.WeatherTemperatureWrapper}>
          <img src={weatherIcon} alt="" className={styles.WeatherIcon} />
        </div>

        <div className={styles.CelsiusFahrenheitWrapper}>

        </div>
      </div>

      <div className={styles.RightSection}></div>
    </div>
  );
}

export default App;
