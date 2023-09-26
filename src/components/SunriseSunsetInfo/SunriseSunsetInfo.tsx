import styles from "./SunriseSunsetInfo.module.scss";
import clockHandsIcon from "../../assets/clock-hands-icon.svg";

interface ISunriseSunsetInfo {
  size: string;
  label: string;
  startTime: string;
  endTime?: string;
}

const SunriseSunsetInfo = ({
  size,
  label,
  startTime,
  endTime = "6:45",
}: ISunriseSunsetInfo) => {
  return (
    <div
      className={[
        styles.SunriseSunsetInfoHost,
        size === "Large" ? styles.Large : styles.Small,
      ].join(" ")}
    >
      <div className={styles.TimeLabel}>{label}</div>

      <div className={styles.TimeInfoContainer}>
        <img className={styles.ClockHandsIcon} src={clockHandsIcon} alt="Clock Hands Icon" />

        <div className={styles.StartTime}>{startTime}</div>
        <div className={styles.EndTime}>
          {label === "Golden Hour" ? endTime + " pm" : endTime}
        </div>
      </div>
    </div>
  );
};

export default SunriseSunsetInfo;
