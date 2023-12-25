import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
function CityList({ cities, isLoading }) {
  cities = cities.map((city) => (
      return {city.emoji}
  )
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by selecting a city on the Map" />
    );
  }

  return (
    <ul className={styles.countriesList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
