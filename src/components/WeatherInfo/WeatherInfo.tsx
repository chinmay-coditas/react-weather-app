import styles from "./WeatherInfo.module.scss";
import windDirectionIcon from "../../assets/wind-direction-icon.svg";
import humidityIcon from "../../assets/humidity-icon.svg";
import rainIcon from "../../assets/rain-icon.svg";

interface IWeatherInfo {
  detailType: string;
  info: string;
}

const WeatherInfo = ({ detailType, info }: IWeatherInfo) => {
  return (
    <>
      <div className={styles.WeatherInfoHost}>
        {detailType === "Wind" ? (
          <img className={styles.Icon} src={windDirectionIcon} alt="" />
        ) : detailType === "Humidity" ? (
          <img className={styles.Icon} src={humidityIcon} alt="" />
        ) : detailType === "Rain" ? (
          <img className={styles.Icon} src={rainIcon} alt="" />
        ) : null}

        <div className={styles.Label}>
          {detailType === "Wind"
            ? "Wind"
            : detailType === "Humidity"
            ? "Humidity"
            : detailType === "Rain"
            ? "Rain"
            : ""}
        </div>
        <div className={styles.Info}>
          {detailType === "Wind" ? convertWindSpeed(info) : info}
          <span>{detailType === "Wind" ? " km/h" : " %"}</span>
        </div>
      </div>
    </>
  );

  function convertWindSpeed(info: string) {
    return (parseFloat(info) * 3.6).toFixed(2);
  }
};

export default WeatherInfo;
