import styles from "./SunriseSunsetInfo.module.scss";
import clockHandsIcon from "../../assets/clock-hands-icon.svg";

interface ISunriseSunsetInfo {
  size: string;
  label: string;
}

const SunriseSunsetInfo = ({ size, label }: ISunriseSunsetInfo) => {
  return (
    <div
      className={[
        styles.SunriseSunsetInfoHost,
        size === "Large" ? styles.Large : styles.Small,
      ].join(" ")}
    >
      <div className={styles.TimeLabel}>{label}</div>

      <div className={styles.TimeInfoContainer}>
        <img className={styles.ClockHandsIcon} src={clockHandsIcon} alt="" />

        <div className={styles.StartTime}>11:24</div>
        <div className={styles.EndTime}>11:45</div>
      </div>
    </div>
  );
};

export default SunriseSunsetInfo;
