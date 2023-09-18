import styles from "./SearchWidget.module.scss";
import locationPinIcon from "../../assets/location-pin-icon.svg";
import searchButtonIcon from "../../assets/search-button-icon.svg";
import searchIcon from "../../assets/search-icon.svg";

interface ISearchWidget {
  currentLocation: string;
  showSearchInput: boolean;
  handleSearchButtonIconClick: () => void;
  handleSearchInput: (e: any) => void;
}

const SearchWidget = ({
  currentLocation,
  showSearchInput,
  handleSearchButtonIconClick,
  handleSearchInput,
}: ISearchWidget) => {
  return (
    <div className={styles.SearchWidgetHost}>
      {showSearchInput ? (
        <div className={styles.SearchInputContainer}>
          <input
            type="text"
            className={styles.SearchInput}
            onKeyDown={handleSearchInput}
            placeholder="Enter city name ↩"
            autoFocus
          />
          <img
            className={styles.SearchButtonIcon}
            src={searchIcon}
            alt=""
            onClick={handleSearchButtonIconClick}
          />
        </div>
      ) : (
        <div className={styles.LocationContainer}>
          <img
            className={styles.LocationPinIcon}
            src={locationPinIcon}
            alt=""
          />
          <div className={styles.LocationLabel}>{currentLocation}</div>
          <img
            className={styles.SearchButtonIcon}
            src={searchButtonIcon}
            alt=""
            onClick={handleSearchButtonIconClick}
          />
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
