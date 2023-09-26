import styles from "./IndexInfo.module.scss";
import indexMeterImage from "../../assets/index-meter.svg";

interface IIndexInfo {
  label: string;
  indexValue: string;
  maxValue: string;
}

const IndexInfo = ({ label, indexValue, maxValue }: IIndexInfo) => {
  const style: React.CSSProperties = {
    "--index": parseInt(indexValue) * (190 / parseInt(maxValue)) - 100 + "deg",
  } as React.CSSProperties;

  let indexLevel = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][
    parseInt(indexValue) - 1
  ];
  
  //TODO: refactor when UV Index API is available
  if (parseInt(indexValue) > 5) {
    indexLevel = "High";
  }

  return (
    <div className={styles.IndexInfoHost}>
      <div className={styles.Label}>{label}</div>
      <div className={styles.container}>
        <span className={styles.IndexMarker} style={style}></span>
        <div className={styles.MeterImage}>
          <img className={styles.Icon} src={indexMeterImage} alt="Index Meter Image" />
        </div>
        <div className={styles.MeterInfoWrapper}>
          <div className={styles.IndexNumber}>
            {indexValue}/{maxValue}
          </div>
          <div className={styles.IndexLevel}>{indexLevel}</div>
        </div>
      </div>
    </div>
  );
};

export default IndexInfo;
