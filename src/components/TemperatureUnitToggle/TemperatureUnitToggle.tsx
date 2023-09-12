import styles from "./TemperatureUnitToggle.module.scss";

const TemperatureUnitToggle = () => {
  return (
    <>
      <input
        className={styles.ReactToggleCheckbox}
        id={`ReactToggleNew`}
        type="checkbox"
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
