import styles from "./SearchWidget.module.scss";
import locationPinIcon from "../../assets/location-pin-icon.svg";
import searchButtonIcon from "../../assets/search-button-icon.svg";

// interface ISearchWidget {
//   temperature: string;
//   dayLabel: string;
// }

const SearchWidget = () => {
  return (
    <>
      <div className={styles.SearchWidgetHost}>
        <img className={styles.Icon} src={locationPinIcon} alt="" />

        <div className={styles.LocationLabel}>Delhi, India</div>

        <img className={styles.Icon} src={searchButtonIcon} alt="" />
      </div>
    </>
  );
};

export default SearchWidget;
