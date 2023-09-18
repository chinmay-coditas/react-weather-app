import styles from "./TemperatureUnitToggle.module.scss";

interface ITemperatureUnitToggle {
  isCelsius: boolean;
  handleToggle: () => void;
}

const TemperatureUnitToggle = ({
  isCelsius,
  handleToggle,
}: ITemperatureUnitToggle) => {
  return (
    <>
      <input
        className={styles.ReactToggleCheckbox}
        id={`ReactToggleNew`}
        type="checkbox"
        checked={isCelsius}
        onChange={handleToggle}
      />
      <label className={styles.ReactToggleLabel} htmlFor={`ReactToggleNew`}>
        <span>F</span>
        <span>C</span>
        <span className={styles.ReactToggleButton} />
      </label>
    </>
  );
};

export default TemperatureUnitToggle;
