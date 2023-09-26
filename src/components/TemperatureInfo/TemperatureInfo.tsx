import styles from "./TemperatureInfo.module.scss";
import cloudIcon from "../../assets/cloud-icon.svg";

interface ITemperatureInfo {
  temperature: string;
  dayLabel: string;
}

const TemperatureInfo = ({ temperature, dayLabel }: ITemperatureInfo) => {
  return (
    <div className={styles.TemperatureInfoHost}>
      <div className={styles.TemperatureLabel}>
        {temperature}
        <div className={styles.Unit}> ° C</div>
      </div>

      <img className={styles.Icon} src={cloudIcon} alt="Cloud Icon" />

      <div className={styles.DayLabel}>{dayLabel}</div>
    </div>
  );
};

export default TemperatureInfo;
